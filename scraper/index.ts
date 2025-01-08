import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { getTeams } from "./utils/getTeams";
import { getCharacters } from "./utils/getCharacters";

async function main() {
  const characters = await getCharacters();

  writeFileSync(
    resolve(__dirname, "./output/characters.json"),
    JSON.stringify(characters, null, 2)
  );

  const teams = await getTeams(characters);

  writeFileSync(
    resolve(__dirname, "./output/teams.json"),
    JSON.stringify(teams, null, 2)
  );
}

main();
