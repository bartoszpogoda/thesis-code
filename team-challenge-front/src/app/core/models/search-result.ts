
export interface SearchResult {
  results: ScoredTeam[];
}

export interface ScoredTeam {
  teamScore: number;
  teamId: string;
  criteria: Criteria;
}

export interface Criteria {
  numericCriteria: NumericCriteria[];
  booleanCriteria: BooleanCriteria[];
}

export interface NumericCriteria {
  type: NumericCriteriaType;
  normalized: number;
  original: number;
}

export interface BooleanCriteria {
  type: BooleanCriteriaType;
  value: boolean;
}

export type NumericCriteriaType = 'AGE' | 'DISTANCE' | 'EXPERIENCE';
export type BooleanCriteriaType = 'FRIENDLY';

