import axios from "axios";
import { JSDOM } from "jsdom";

export interface CharacterData {
  name: string;
  name_id: string;
}

function normalizeName(name: string) {
  return name.replace("Build", "").replace("build", "").trim();
}

function normalizeID(name: string) {
  return normalizeName(name)
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "-")
    .toLocaleLowerCase();
}

export async function getCharacters(): Promise<CharacterData[]> {
  const chars: CharacterData[] = [];

  await axios
    .get("https://genshinlab.com/honkai-star-rail-characters/")
    .then((response) => {
      const dom = new JSDOM(response.data);

      const titles = dom.window.document.getElementsByClassName(
        "elementor-post__title"
      );

      for (const t of titles) {
        const anchor = t.querySelector("a");
        if (!anchor?.textContent) {
          continue;
        }

        chars.push({
          name_id: normalizeID(anchor.textContent),
          name: normalizeName(anchor.textContent),
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return chars;
}
