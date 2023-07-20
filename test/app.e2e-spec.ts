import { HttpStatus } from '@nestjs/common';
import { AbilityFactory } from '../src/auth/ability.factory';
import { AuthService } from '../src/auth/auth.service';
import { Role } from '../src/user/user.enum';
import { AbilityFactoryMock } from './ability.mock';
import { TestFactory } from './factory';
import { userFixture2 } from './user/user.seed';
import { checkoutFixture } from './app.seed';

describe('Testing app controller', () => {
  // Create instances
  const factory = new TestFactory();
  let service: AuthService;

  beforeAll(async () => {
    const moduleRef = await factory.configure();
    moduleRef.overrideProvider(AbilityFactory).useClass(AbilityFactoryMock);
    const module = await factory.init(moduleRef);
    service = module.get<AuthService>(AuthService);

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

        console.log(response.body);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/updated/);
      });
    });
  });
});
