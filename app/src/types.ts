export interface ICharacterData {
  name: string;
  name_id: string;
}

export interface ITeamData {
  primaryCharacter: ICharacterData;
  characters: ICharacterData[];
}
