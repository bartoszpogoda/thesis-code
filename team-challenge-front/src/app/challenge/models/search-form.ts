
export interface Preferences {
  weightAgeDiff: number;
  weightDistance: number;
  weightSkillDiff: number;
  friendly: boolean;
}

export interface SearchForm {
  searchingTeamId: string;
  preferences: Preferences;
}

