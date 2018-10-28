export interface Team {
  id: string;
  active: boolean;
  balance: number;
  managerId: string;
  managerName: string;
  name: string;
  hasImage: boolean;
}

export interface TeamCreationForm {
  name: string;
  disciplineId: string;
  regionId: string;
}
