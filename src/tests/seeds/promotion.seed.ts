import {
  IPromotionCreatePayload,
  IPromotionUpdatePayload,
} from "../../payloads";

export const promotionFixture: IPromotionCreatePayload = {
  shopId: 1,
  name: "Promotion",
  description: "Promotion description",
  startAt: new Date(),
  endAt: new Date(),
  checkoutLimit: 1,
};

export const modifiedPromotionFixture: IPromotionUpdatePayload = {
  name: "testModified",
  description: "testModified",
  checkoutLimit: 10,
  isActive: false,
};

export const modifiedEmptyPromotionFixture: IPromotionUpdatePayload = {
  name: "",
  description: "",
};
