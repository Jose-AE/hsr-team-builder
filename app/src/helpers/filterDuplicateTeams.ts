import type { ITeamData } from "../types";

export function filterDuplicateTeams(teams: ITeamData[]): ITeamData[] {
  const teamsMap = new Map<string, ITeamData>();

  for (const team of teams) {
    const teamChars = team.characters.map((el) => el.name_id).sort();
    teamsMap.set(teamChars.join("_"), team);
  }

  return Array.from(teamsMap.values());
}
