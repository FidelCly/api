export interface IPromotionCounterCreatePayload {
  cardId: number;
  promotionId: number;
  counter?: number;
}

export interface IPromotionCounterUpdatePayload {
  counter?: number;
}
