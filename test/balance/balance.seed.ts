import { CreateBalanceDto, UpdateBalanceDto } from 'src/balance/balance.dto';

export const balanceFixture: CreateBalanceDto = {
  promotionId: 1,
  cardId: 1,
};

export const modifiedBalanceFixture: UpdateBalanceDto = {
  counter: 2,
};
