import axios from "axios";
import jsdom from "jsdom";
import util from "util";

import { CharacterData, getCharacters } from "./getCharacters";
const { JSDOM } = jsdom;

interface TeamData {
  primaryCharacter: CharacterData;
  characters: CharacterData[];
}

function getTeamDivs(dom: jsdom.JSDOM): Element[] {
  // Select all elements with class "e-con-inner"
  const elementsWithClass =
    dom.window.document.getElementsByClassName("e-con-inner");

  // Filter elements based on the number of child elements and that arent widgets
  const teamDivs = Array.from(elementsWithClass).filter((element) => {
    if (element.children.length === 4) {
      return Array.from(element.children).every(
        (child) => !child.className.includes("widget")
      );
    }
    return false;
  });

  //console.log(`Number of teams: ${teamDivs.length}`);

  return teamDivs;
}

function getCharactersInTeamDiv(
  element: Element,
  chars: CharacterData[]
): CharacterData[] {
  const charNameTags = element.querySelectorAll(`p span em strong`);
  const charactersData: CharacterData[] = [];

  for (let i = 0; i < charNameTags.length; i++) {
    const tagText = charNameTags[i].textContent;

    if (
      tagText?.includes("Healer") ||
      tagText?.includes("DPS") ||
      tagText?.includes("Support") ||
      tagText?.includes("Tank") ||
      tagText?.includes("Shield")
    )
      continue;
    //if (i % 2 == 1) continue;

    const charToAdd = chars.find((chr) => {
      //console.log(`${chr.name} === ${charNameTags[i].textContent}`);
      return charNameTags[i].textContent?.includes(chr.name);
    });

    if (charToAdd) charactersData.push(charToAdd);
    else {
      //console.log("------" + charNameTags[i].textContent);
    }
  }

  //console.log(emTagsFollowedByBr[0].textContent);

  return charactersData;
}

function generateTeamsDataFromDom(
  dom: jsdom.JSDOM,
  chars: CharacterData[],
  mainChar: CharacterData
): TeamData[] {
  const teamDivs = getTeamDivs(dom);
  const teams: TeamData[] = [];

  for (let teamDiv of teamDivs) {
    const teamChars = getCharactersInTeamDiv(teamDiv, chars);
    if (teamChars.length === 4) {
      teams.push({ characters: teamChars, primaryCharacter: mainChar });
      console.log("\x1b[32m" + `Added ${mainChar.name} team`);
    } else {
      console.log(
        "\x1b[31m" +
          `Error adding ${mainChar.name} team, length of chars is not 4`
      );
    }
  }

  return teams;
}

export async function getTeams(): Promise<TeamData[]> {
  const teams: TeamData[] = [];
  const chars = await getCharacters();

  for (let char of chars) {
    await axios
      .get(
        `https://genshinlab.com/honkai-star-rail-team/${char.name_id}-team-guide/`
      )
      .then((response) => {
        const dom = new JSDOM(response.data);
        const charTeams = generateTeamsDataFromDom(dom, chars, char);
        teams.push(...charTeams);
        //console.log(util.inspect(charTeams, true, null, true));
      })
      .catch(async (error) => {
        //console.log(`error getting teams for ${char.name_id}`);
        await axios
          .get(
            `https://genshinlab.com/honkai-star-rail-team/${char.name_id.replace(
              "-",
              ""
            )}-team-guide/`
          )
          .then((response) => {
            const dom = new JSDOM(response.data);
            teams.push(...generateTeamsDataFromDom(dom, chars, char));
          })
          .catch((error) => {
            console.log(`Error getting teams for ${char.name_id}`);
          });
      });
  }

  return teams;
}
