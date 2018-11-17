
export interface Preferences {
  weightAgeDiff: number;
  weightDistance: number;
  weightSkillDiff: number;
  fairPlay: boolean;
  playAgain: boolean;
  bigActivity: boolean;
}

export interface SearchForm {
  searchingTeamId: string;
  preferences: Preferences;
}

