import { getTeams } from "./utils/getTeams";
import util from "util";
import fs from "fs";
import { getCharacters } from "./utils/getCharacters";

async function main() {
  const characters = await getCharacters();

  fs.writeFileSync(
    "./scraper/output/characters.json",
    JSON.stringify({ characters })
  );

  const teams = await getTeams();

  fs.writeFileSync("./scraper/output/teams.json", JSON.stringify({ teams }));
}

main();
