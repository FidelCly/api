export interface IPromotionCreatePayload {
  shopId: number;
  userId: number;
  name: string;
  description?: string;
  type: number;
  startAt: string;
  endAt?: string;
  limitPassage?: number; // Number of passage in case of PASSAGE type
  limitAmout?: number; // Number of item in case of AMOUNT type
}

export interface IPromotionUpdatePayload {
  shopId: number;
  userId: number;
  name?: string;
  description?: string;
  type?: number;
  endAt?: string;
  limitPassage?: number;
  limitAmout?: number;
}
