import { IUserCreatePayload, IUserUpdatePayload } from "../../payloads";

export const userFixture: IUserCreatePayload = {
  username: "testUsername",
  email: "testEmail@email.com",
};

export const modifiedUserFixture: IUserUpdatePayload = {
  username: "testUsernameModified",
};

export const emptyModifiedUserFixture: IUserUpdatePayload = {
  username: "",
};
