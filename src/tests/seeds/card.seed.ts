import { ICardCreatePayload, ICardUpdatePayload } from "../../payloads";

export const cardFixture: ICardCreatePayload = {
  url: "https://example.com",
  shopId: 1,
  userId: 1,
  startAt: new Date(),
  endAt: new Date(),
};

export const modifiedCardFixture: ICardUpdatePayload = {
  url: "http://testModified.com",
  isActive: false,
};

export const emptyModifiedCardFixture: ICardUpdatePayload = {
  url: "",
};
