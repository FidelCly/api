export interface IPromotionCounterCreatePayload {
  shopId: number;
  userId: number;
  promotionId: number;
  increment?: number;
  isActive?: boolean;
  nbValidation?: number;
}

export interface IPromotionCounterUpdatePayload {
  shopId: number;
  userId: number;
  promotionId: number;
  increment?: number;
  isActive?: boolean;
  nbValidation?: number;
}
