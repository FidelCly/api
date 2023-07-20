import { CheckoutDto } from 'src/app.dto';
import { userFixture } from './user/user.seed';

export const checkoutFixture: CheckoutDto = {
  uuid: userFixture.uuid,
  promotionId: 1,
};
