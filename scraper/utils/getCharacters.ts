import axios from "axios";
import jsdom from "jsdom";
const { JSDOM } = jsdom;

export interface CharacterData {
  name: string;
  name_id: string;
}

function normalizeName(name: string | null | undefined) {
  if (name) {
    name = name.replace(" Build ", "").substring(1);
    name = name.replace(" build ", "");
    name = name.replace(/[^\w\s]/g, "").replace(/\s+/g, "-");
    name = name.toLocaleLowerCase();
    return name;
  }
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

      for (let t of titles) {
        const anchor = t.querySelector("a");

        if (anchor) {
          chars.push({
            name_id: normalizeName(anchor.textContent) as string,
            name: anchor.textContent
              ?.replace(" Build ", "")
              .replace(" build ", "")
              .substring(1) as string,
          });
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return chars;
}
