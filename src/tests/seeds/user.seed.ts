import { IUserCreatePayload } from "../../payloads";

export const userFixture: IUserCreatePayload = {
  username: "testUsername",
  email: "testEmail@email.com",
};

export const modifiedUserFixture = {
  username: "testUsernameModified",
};

export const emptyModifiedUserFixture = {
  username: "",
};
