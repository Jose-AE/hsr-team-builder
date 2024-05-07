import { getTeams } from "./utils/getTeams";
import util from "util";
import fs from "fs";

async function main() {
  const teams = await getTeams();

  fs.writeFileSync("./scraper/output/teams.json", JSON.stringify({ teams }));
}

main();
