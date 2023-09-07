import {
  CreatePromotionDto,
  UpdatePromotionDto,
} from 'src/promotion/promotion.dto';

const nextYear = new Date();
nextYear.setDate(nextYear.getFullYear() + 1);

export const promotionFixture: CreatePromotionDto = {
  name: 'Promotion',
  description: 'Promotion description',
  startAt: new Date(),
  endAt: nextYear,
  checkoutLimit: 10,
};

export const modifiedPromotionFixture: UpdatePromotionDto = {
  name: 'testModified',
  description: 'testModified',
  checkoutLimit: 5,
};

export const modifiedEmptyPromotionFixture: UpdatePromotionDto = {
  name: '',
};
