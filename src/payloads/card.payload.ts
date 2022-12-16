export interface ICardCreatePayload {
  url: string;
  shopId: number;
  userId: number;
  startAt?: Date;
  endAt: Date;
  isActive?: boolean;
}

export interface ICardUpdatePayload {
  url?: string;
  startAt?: Date;
  endAt?: Date;
  isActive?: boolean;
}
