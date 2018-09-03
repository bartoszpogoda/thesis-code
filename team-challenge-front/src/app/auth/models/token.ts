export interface Token {
  token: string;
}

export interface DecodedToken {
  email: string;
  fullName: string;
  roles: Role[];
}

export interface Role {
  authority: string;
}
