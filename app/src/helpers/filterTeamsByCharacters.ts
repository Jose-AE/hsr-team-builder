import type { ICharacterData, ITeamData } from "../types";

function filterTeamByCharacters(team: ITeamData, characters: ICharacterData[]) {
  let numMatchingChars = 0;

  for (const teamChar of team.characters) {
    for (const char of characters) {
      if (char.name_id === teamChar.name_id) {
        numMatchingChars++;
      }
    }
  }

  return numMatchingChars === 4;
}

export function filterTeamsByCharacters(
  teams: ITeamData[],
  characters: ICharacterData[]
) {
  return teams.filter((team) => filterTeamByCharacters(team, characters));
}
