export interface Team {
  id: string;
  active: boolean;
  balance: number;
  managerId: string;
  managerName: string;
  name: string;
}

export interface TeamCreationForm {
  name: string;
}
