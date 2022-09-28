export interface ICardCreatePayload {
  url: string;
  shopId: number;
  userId: number;
  startAt: string;
  endAt?: string;
}

export interface ICardUpdatePayload {
  url?: string;
  startAt?: Date;
  endAt?: Date;
  isActive?: boolean;
}
