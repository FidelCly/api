export interface IUserCreatePayload {
  username: string;
  email: string;
}

export interface IUserUpdatePayload {
  username?: string;
  email?: string;
}
