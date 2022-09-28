export interface IPromotionCounterCreatePayload {
  shopId: number;
  userId: number;
  promotionId: number;
  increment?: number;
  isActive?: boolean;
  nbValidation?: number;
  createAt: string;
  updatedAt: string;
}

export interface IPromotionCounterUpdatePayload {
  shopId: number;
  userId: number;
  promotionId: number;
  increment?: number;
  isActive?: boolean;
  nbValidation?: number;
  updatedAt?: string;
}
