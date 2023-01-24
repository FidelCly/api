import { ICardCreatePayload, ICardUpdatePayload } from "../../payloads";

var nextYear = new Date();
nextYear.setDate(nextYear.getFullYear() + 1);

export const cardFixture: ICardCreatePayload = {
  url: "https://example.com",
  shopId: 1,
  userId: 1,
  startAt: new Date(),
  endAt: nextYear,
};

export const modifiedCardFixture: ICardUpdatePayload = {
  url: "http://testModified.com",
  isActive: false,
};

export const emptyModifiedCardFixture: ICardUpdatePayload = {
  url: "",
};
