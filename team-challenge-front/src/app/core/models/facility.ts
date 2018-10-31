import {Position} from './position';

export interface Facility {
  id: string;
  name: string;
  disciplineId: string;
  regionId: string;
  position: Position;
  lighting?: boolean;
  surfaceType?: string;
  playingSpots?: number;
  description?: string;
  tokenPrice: number;
}

export interface FacilityCreationForm {
  name?: string;
  disciplineId: string;
  regionId?: string;
  position?: Position;
  lighting?: boolean;
  surfaceType?: string;
  playingSpots?: number;
  description?: string;
}
