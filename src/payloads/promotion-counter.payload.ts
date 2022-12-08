export interface IPromotionCounterCreatePayload {
  userId: number;
  promotionId: number;
  counter?: number;
}

export interface IPromotionCounterUpdatePayload {
  counter?: number;
}
