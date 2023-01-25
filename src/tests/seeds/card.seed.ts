import { ICardCreatePayload, ICardUpdatePayload } from "../../payloads";

var nextDay = new Date();
nextDay.setDate(nextDay.getDate() + 1);

export const cardFixture: ICardCreatePayload = {
  url: "https://example.com",
  shopId: 1,
  userId: 1,
  startAt: new Date(),
  endAt: nextDay,
};

export const modifiedCardFixture: ICardUpdatePayload = {
  url: "http://testModified.com",
  isActive: false,
};

export const emptyModifiedCardFixture: ICardUpdatePayload = {
  url: "",
};
