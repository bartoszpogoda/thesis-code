export interface Token {
  token: string;
}

export interface DecodedToken {
  email: string;
  fullName: string;
  roles: Role[];
  expires: number;
  id: string;
}

export interface Role {
  authority: string;
}
