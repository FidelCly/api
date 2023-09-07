/* eslint-disable no-undef */
import { HttpStatus } from '@nestjs/common';
import { AbilityFactory } from '../../src/auth/ability.factory';
import { AuthService } from '../../src/auth/auth.service';
import { PromotionService } from '../../src/promotion/promotion.service';
import { Role } from '../../src/user/user.enum';
import { AbilityFactoryMock } from '../ability.mock';
import { TestFactory } from '../factory';
import { userFixture } from '../user/user.seed';
import {
  modifiedEmptyPromotionFixture,
  modifiedPromotionFixture,
  promotionFixture,
} from './promotion.seed';

describe('Testing promotion controller', () => {
  // Create instances
  const factory = new TestFactory();
  let service: AuthService;
  let promotionService: PromotionService;

  beforeAll(async () => {
    const moduleRef = await factory.configure();
    moduleRef.overrideProvider(AbilityFactory).useClass(AbilityFactoryMock);
    const module = await factory.init(moduleRef);
    service = module.get<AuthService>(AuthService);
    promotionService = module.get<PromotionService>(PromotionService);

    await factory.seedUser();
    await factory.seedShop();
  });

  afterAll(async () => {
    await factory.close();
  });

  beforeEach(() => {
    jest.spyOn(service, 'validate').mockResolvedValue({
      status: HttpStatus.OK,
      userUuid: userFixture.uuid,
      role: Role.Fider,
      errors: null,
    });

    jest
      .spyOn(promotionService, 'sendToAnalytics')
      .mockResolvedValue({ status: 200, errors: null });
  });

  describe('Create promotion', () => {
    describe('with an empty payload', () => {
      it('responds with status 400', async () => {
        const response = await factory.post('/promotion');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(400);
      });
    });

    describe('with a correct payload', () => {
      it('responds with status 201', async () => {
        const response = await factory
          .post('/promotion')
          .send(promotionFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe(promotionFixture.name);
        expect(response.body.description).toBe(promotionFixture.description);
        expect(response.body.checkoutLimit).toBe(
          promotionFixture.checkoutLimit,
        );
      });
    });
  });

  describe('Update promotion', () => {
    describe('of unknown id', () => {
      it('responds with status 404', async () => {
        const response = await factory
          .put('/promotion/10')
          .send(modifiedPromotionFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('with incorrect payload', () => {
      it('responds with status 400', async () => {
        const response = await factory
          .put('/promotion/1')
          .send(modifiedEmptyPromotionFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(400);
      });
    });

    describe('with a correct payload', () => {
      it('responds with status 200', async () => {
        const response = await factory
          .put('/promotion/1')
          .send(modifiedPromotionFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/updated/);
      });
    });
  });

  describe('Delete promotion', () => {
    describe('of unknown id', () => {
      it('responds with status 404', async () => {
        const response = await factory.delete('/promotion/10');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('of known id', () => {
      it('responds with status 200', async () => {
        const response = await factory.delete('/promotion/1');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/deleted/);
      });
    });
  });
});
