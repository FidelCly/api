import {
  IPromotionCreatePayload,
  IPromotionUpdatePayload,
} from "../../payloads";

var nextYear = new Date();
nextYear.setDate(nextYear.getFullYear() + 1);

export const promotionFixture: IPromotionCreatePayload = {
  shopId: 1,
  name: "Promotion",
  description: "Promotion description",
  startAt: new Date(),
  endAt: nextYear,
  checkoutLimit: 10,
};

export const modifiedPromotionFixture: IPromotionUpdatePayload = {
  name: "testModified",
  description: "testModified",
  checkoutLimit: 5,
};

export const modifiedEmptyPromotionFixture: IPromotionUpdatePayload = {
  name: "",
};
