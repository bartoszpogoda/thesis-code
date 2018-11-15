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
  skill?: number;
  disciplineId: string;
  regionId: string;
}

export interface InvitablePlayer {
  player: Player;
  invited: boolean;
}

const frequencyDescription = [
  'Okazjonalnie',
  'Parę razy miesięcznie',
  'Pare razy tygodniowo'
];

const skillDescription = [
  'Świeżak',
  'Początkujący',
  'Początkujący',
  'Początkujący',
  'Średnio-zaawansowany',
  'Średnio-zaawansowany',
  'Średnio-zaawansowany',
  'Zaawansowany',
  'Zaawansowany',
  'Zaawansowany',
  'Expert'
];

export const getSkillDescription = (skill) => {
  return skillDescription[skill];
};

export const getFrequencyDescription = (skill) => {

  if (skill === 0) {
    return '';
  } else if (skill === 10) {
    return '';
  } else {
    return frequencyDescription[(skill - 1) % 3];
  }
};
