export interface IPromotionCreatePayload {
  shopId: number;
  name: string;
  description?: string;
  checkoutLimit: number;
  startAt?: Date;
  endAt: Date;
  isActive?: boolean;
}

export interface IPromotionUpdatePayload {
  name?: string;
  description?: string;
  checkoutLimit?: number;
  startAt?: Date;
  endAt?: Date;
  isActive?: boolean;
}
