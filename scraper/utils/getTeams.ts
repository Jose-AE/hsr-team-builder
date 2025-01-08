import axios from "axios";
import { JSDOM } from "jsdom";

import type { CharacterData } from "./getCharacters";

interface TeamData {
  primaryCharacter: CharacterData;
  characters: CharacterData[];
}

function getTeamDivs(dom: JSDOM): Element[] {
  // Select all elements with class "e-con-inner"
  const elementsWithClass =
    dom.window.document.getElementsByClassName("e-con-inner");

  // Filter elements based on the number of child elements and that arent widgets
  return Array.from(elementsWithClass).filter((element) => {
    if (element.children.length === 4) {
      return Array.from(element.children).every(
        (child) => !child.className.includes("widget")
      );
    }
    return false;
  });
}

function getCharactersInTeamDiv(
  element: Element,
  chars: CharacterData[]
): CharacterData[] {
  const charNameTags = element.querySelectorAll(`p span em strong`);
  const charactersData: Set<CharacterData> = new Set();

  for (let i = 0; i < charNameTags.length; i++) {
    const tagText = charNameTags[i].textContent;

    if (
      tagText?.includes("Healer") ||
      tagText?.includes("DPS") ||
      tagText?.includes("Support") ||
      tagText?.includes("Tank") ||
      tagText?.includes("Shield") ||
      tagText?.includes("Break Damage Dealer")
    ) {
      continue;
    }

    const charToAdd = chars.find(
      (chr) =>
        charNameTags[i].textContent?.includes(chr.name) ||
        charNameTags[i].textContent?.replace(/[\(\)]/, '').includes(chr.name) // Handle trailbrazer case
    );
    if (charToAdd) {
      charactersData.add(charToAdd);
    }
  }

  return Array.from(charactersData);
}

function generateTeamsDataFromDom(
  dom: JSDOM,
  chars: CharacterData[],
  mainChar: CharacterData
): TeamData[] {
  const teamDivs = getTeamDivs(dom);
  if (!teamDivs.length) {
    return [];
  }

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

async function loadCharacterTeams(
  char: CharacterData,
  allCharacters: CharacterData[]
) {
  return axios
    .get(
      `https://genshinlab.com/honkai-star-rail-team/${char.name_id}-team-guide/`
    )
    .then((response) => {
      const dom = new JSDOM(response.data);
      return generateTeamsDataFromDom(dom, allCharacters, char);
    });
}

export async function getTeams(
  chars: CharacterData[] = []
): Promise<TeamData[]> {
  const teams: TeamData[] = [];

  for (let char of chars) {
    // Initial teams load
    await loadCharacterTeams(char, chars)
      .then((charTeams) => {
        teams.push(...charTeams);
      })
      .catch(async () => {
        // Fallback
        await loadCharacterTeams(
          {
            ...char,
            name_id: char.name_id.replace("-", ""),
          },
          chars
        )
          .then((charTeams) => {
            teams.push(...charTeams);
          })
          .catch(() => {
            console.log(`Error getting teams for ${char.name_id}`);
          });
      });
  }

  return teams;
}
