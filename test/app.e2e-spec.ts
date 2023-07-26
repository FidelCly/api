import { HttpStatus } from '@nestjs/common';
import { AbilityFactory } from '../src/auth/ability.factory';
import { AuthService } from '../src/auth/auth.service';
import { BalanceService } from '../src/balance/balance.service';
import { Role } from '../src/user/user.enum';
import { AbilityFactoryMock } from './ability.mock';
import { checkoutFixture } from './app.seed';
import { TestFactory } from './factory';
import { userFixture2 } from './user/user.seed';

describe('Testing app controller', () => {
  // Create instances
  const factory = new TestFactory();
  let service: AuthService;
  let balanceService: BalanceService;

  beforeAll(async () => {
    const moduleRef = await factory.configure();
    moduleRef.overrideProvider(AbilityFactory).useClass(AbilityFactoryMock);
    const module = await factory.init(moduleRef);
    service = module.get<AuthService>(AuthService);
    balanceService = module.get<BalanceService>(BalanceService);

    await factory.seedUser();
    await factory.seedUser(userFixture2);
    await factory.seedShop(null, 2);
    await factory.seedCard();
    await factory.seedPromotion();
  });

  afterAll(async () => {
    await factory.close();
  });

  beforeEach(() => {
    jest.spyOn(service, 'validate').mockResolvedValue({
      status: HttpStatus.OK,
      userUuid: userFixture2.uuid,
      role: Role.Fider,
      errors: null,
    });

    jest
      .spyOn(balanceService, 'sendToAnalytics')
      .mockResolvedValue({ status: 200, errors: null });
  });

  describe('Checkout balance', () => {
    describe('with an empty payload', () => {
      it('responds with status 400', async () => {
        const response = await factory.put('/checkout');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(400);
      });
    });

    describe('with correct payload', () => {
      it('responds with status 200', async () => {
        const response = await factory.put('/checkout').send(checkoutFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/updated/);
      });
    });
  });
});
