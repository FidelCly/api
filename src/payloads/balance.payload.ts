export interface IBalanceCreatePayload {
  promotionId: number;
  cardId: number;
  counter?: number
  isActive?: boolean;
}

export interface IBalanceUpdatePayload {
  counter?: number
  isActive?: boolean;
}
