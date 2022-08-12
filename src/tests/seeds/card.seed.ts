import { ICardCreatePayload } from "../../payloads";

export const cardFixture: ICardCreatePayload = {
  url: "https://example.com",
  shopId: 1,
  userId: 1,
  startAt: new Date().toUTCString(),
  endAt: new Date().toUTCString(),
};
