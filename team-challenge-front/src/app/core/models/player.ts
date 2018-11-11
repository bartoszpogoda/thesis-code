export interface Player {
  id: string;
  regionId: string;
  age: number;
  fullName: string;
  height: number;
  teamId: string | null;
  teamName: string;
  skill: number;
  hasImage: boolean;
}

export interface PlayerRegistrationForm {
  height: number;
  skill: number;
  disciplineId: string;
  regionId: string;
}

export interface InvitablePlayer {
  player: Player;
  invited: boolean;
}

