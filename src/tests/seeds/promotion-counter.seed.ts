import { IPromotionCounterCreatePayload } from "../../payloads";

export const promotionCounterFixture: IPromotionCounterCreatePayload = {
  shopId: 1,
  userId: 1,
  promotionId: 1,
  increment: 1,
  isActive: true,
  nbValidation: 1,
  createAt: new Date().toUTCString(),
  updatedAt: new Date().toUTCString(),
};
