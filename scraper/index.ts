import { getCharacters } from "./utils/getCharacters";
import { getTeams } from "./utils/getTeams";
import util from "util";

async function main() {
  const teams = await getTeams();
  //console.log(util.inspect(teams, true, null, true));
  console.log("-------done----------");
}

main();
