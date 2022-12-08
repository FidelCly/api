import {
  IPromotionCounterCreatePayload,
  IPromotionCounterUpdatePayload,
} from "../../payloads";

export const promotionCounterFixture: IPromotionCounterCreatePayload = {
  cardId: 1,
  promotionId: 1,
};

export const modifiedPromotionCounterFixture: IPromotionCounterUpdatePayload = {
  counter: 2,
};
