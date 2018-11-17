import {Team} from '../../core/models/team';

export interface SearchResult {
  results: ScoredTeam[];
}

export interface ScoredTeam {
  totalScore: number;
  team: Team;
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

export type NumericCriteriaType = 'AGE' | 'DISTANCE' | 'SKILL';
export type BooleanCriteriaType = 'FAIRPLAY' | 'PLAYAGAIN' | 'BIGACTIVITY';

