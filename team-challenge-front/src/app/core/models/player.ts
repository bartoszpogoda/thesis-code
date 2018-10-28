export interface Player {
  id: string;
  age: number;
  fullName: string;
  height: number;
  teamId: string | null;
  teamName: string;
  yearsOfExperience: number;
  hasImage: boolean;
}

export interface PlayerRegistrationForm {
  height: number;
  yearsOfExperience: number;
  disciplineId: string;
  regionId: string;
}

export interface InvitablePlayer {
  player: Player;
  invited: boolean;
}

