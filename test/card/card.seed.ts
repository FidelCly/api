import { CreateCardDto, UpdateCardDto } from 'src/card/card.dto';

const nextDay = new Date();
nextDay.setDate(nextDay.getDate() + 1);

export const cardFixture: CreateCardDto = {
  shopId: 1,
  userId: 1,
  startAt: new Date(),
  endAt: nextDay,
};

export const modifiedCardFixture: UpdateCardDto = {
  isActive: false,
};
