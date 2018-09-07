export interface Token {
  token: string;
}

export interface DecodedToken {
  email: string;
  fullName: string;
  roles: Role[];
  expires: number;
}

export interface Role {
  authority: string;
}
