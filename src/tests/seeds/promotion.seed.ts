import { IPromotionCreatePayload } from "../../payloads";

export const promotionFixture: IPromotionCreatePayload = {
  shopId: 1,
  userId: 1,
  name: "Promotion",
  description: "Promotion description",
  type: 1,
  startAt: new Date().toUTCString(),
  endAt: new Date().toUTCString(),
  limitPassage: 1,
  limitAmout: 1,
};
