import { IBalanceCreatePayload, IBalanceUpdatePayload } from "../../payloads";

export const balanceFixture: IBalanceCreatePayload = {
  promotionId: 1,
  cardId: 1,
};

export const modifiedBalanceFixture: IBalanceUpdatePayload = {
  counter: 2,
};
