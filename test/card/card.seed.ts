import { CreateCardDto, UpdateCardDto } from 'src/card/card.dto';

export const cardFixture: CreateCardDto = {
  shopId: 1,
  userId: 1,
};

export const cardFixture2: CreateCardDto = {
  shopId: 2,
  userId: 1,
};
export const modifiedCardFixture: UpdateCardDto = {
  isActive: false,
};
