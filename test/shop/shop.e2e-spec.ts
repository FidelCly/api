import { HttpStatus } from '@nestjs/common';
import { AbilityFactory } from '../../src/auth/ability.factory';
import { AuthService } from '../../src/auth/auth.service';
import { ShopService } from '../../src/shop/shop.service';
import { Role } from '../../src/user/user.enum';
import { AbilityFactoryMock } from '../ability.mock';
import { TestFactory } from '../factory';
import { userFixture, userFixture2 } from '../user/user.seed';
import {
  emptyModifiedShopFixture,
  farAwayShopFixture,
  modifiedShopFixture,
  shopFixture,
} from './shop.seed';

describe('Testing shop controller', () => {
  // Create instances
  const factory = new TestFactory();
  let authService: AuthService;
  let shopService: ShopService;

  beforeAll(async () => {
    const moduleRef = await factory.configure();
    moduleRef.overrideProvider(AbilityFactory).useClass(AbilityFactoryMock);
    const module = await factory.init(moduleRef);
    authService = module.get<AuthService>(AuthService);
    shopService = module.get<ShopService>(ShopService);

    await factory.seedUser();
    await factory.seedUser(userFixture2);
  });

  afterAll(async () => {
    await factory.close();
  });

  beforeEach(() => {
    jest.spyOn(authService, 'validate').mockResolvedValue({
      status: HttpStatus.OK,
      userUuid: userFixture.uuid,
      role: Role.Fider,
      errors: null,
    });

    jest
      .spyOn(shopService, 'sendToAnalytics')
      .mockResolvedValue({ status: 200, errors: null });
  });

  describe('Create shop', () => {
    describe('with an empty payload', () => {
      it('responds with status 400', async () => {
        const response = await factory.post('/shop');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(400);
      });
    });

    describe('with a correct payload', () => {
      it('responds with status 201', async () => {
        const response = await factory.post('/shop').send(shopFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(201);
        expect(response.body.companyName).toBe(shopFixture.companyName);
        expect(response.body.email).toBe(shopFixture.email);
      });
    });
  });

  describe('Update shop', () => {
    describe('of unknown id', () => {
      it('responds with status 404', async () => {
        const response = await factory
          .put('/shop/10')
          .send(modifiedShopFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('with incorrect payload', () => {
      it('responds with status 400', async () => {
        const response = await factory
          .put('/shop/1')
          .send(emptyModifiedShopFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(400);
      });
    });

    describe('of known id', () => {
      it('responds with status 200', async () => {
        const response = await factory.put('/shop/1').send(modifiedShopFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/updated/);
      });
    });
  });

  describe('Get one shop', () => {
    describe('of unknown id', () => {
      it('responds with status 404', async () => {
        const response = await factory.get('/shop/10');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('of known id', () => {
      it('responds with status 200', async () => {
        const response = await factory.get('/shop/1');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe('Get all shops', () => {
    describe('without filters', () => {
      it('responds with status 200', async () => {
        const response = await factory.get('/shop/');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
      });
    });

    describe('with location fitlers', () => {
      it('responds with status 200', async () => {
        await factory.seedShop(farAwayShopFixture, 2);

        const response = await factory.get(
          '/shop/?distance=3000&long=2.3690961&lat=48.8573185',
        );

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
      });
    });
  });

  describe("Get one shop's promotions", () => {
    describe('of known id', () => {
      it('responds with status 200', async () => {
        const response = await factory.get('/shop/1/promotions');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe("Get one shop's clients", () => {
    describe('of known id', () => {
      it('responds with status 200', async () => {
        await factory.seedCard();

        const response = await factory.get('/shop/1/cards');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(1);
      });
    });
  });

  describe("Get one shop's campaigns", () => {
    describe('of known id', () => {
      it('responds with status 200', async () => {
        await factory.seedCampaign();

        const response = await factory.get('/shop/1/campaigns');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(1);
      });
    });
  });

  describe('Delete shop', () => {
    describe('of unknown id', () => {
      it('responds with status 404', async () => {
        const response = await factory.delete('/shop/10');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('of known id', () => {
      it('responds with status 200', async () => {
        const response = await factory.delete('/shop/1');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/deleted/);
      });
    });
  });
});
