
export interface Preferences {
  weightAgeDiff: number;
  weightDistance: number;
  weightExperienceDiff: number;
  friendly: boolean;
}

export interface SearchForm {
  searchingTeamId: string;
  preferences: Preferences;
}

