export interface Player {
  id: string;
  age: number;
  fullName: string;
  height: number;
  teamName: string;
  yearsOfExperience: number;
  hasImage: boolean;
}

export interface PlayerRegistrationForm {
  height: number;
  yearsOfExperience: number;
}

export interface InvitablePlayer {
  player: Player;
  invited: boolean;
}

