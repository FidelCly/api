/* eslint-disable no-undef */
import { HttpStatus } from '@nestjs/common';
import { AbilityFactory } from '../../src/auth/ability.factory';
import { AuthService } from '../../src/auth/auth.service';
import { BalanceService } from '../../src/balance/balance.service';
import { Role } from '../../src/user/user.enum';
import { AbilityFactoryMock } from '../ability.mock';
import { TestFactory } from '../factory';
import { userFixture } from '../user/user.seed';
import { balanceFixture, modifiedBalanceFixture } from './balance.seed';

describe('Testing balance controller', () => {
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
    await factory.seedShop();
    await factory.seedCard();
    await factory.seedPromotion();
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
      .spyOn(balanceService, 'sendToAnalytics')
      .mockResolvedValue({ status: 200, errors: null });
  });

  describe('Create balance', () => {
    describe('with an empty payload', () => {
      it('responds with status 400', async () => {
        const response = await factory.post('/balance');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(400);
      });
    });

    describe('with a correct payload', () => {
      it('responds with status 201', async () => {
        const response = await factory.post('/balance').send(balanceFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(201);
        expect(response.body.promotionId).toBe(balanceFixture.promotionId);
        expect(response.body.cardId).toBe(balanceFixture.cardId);
      });
    });
  });

  describe('Update balance', () => {
    describe('of unknown id', () => {
      it('responds with status 404', async () => {
        const response = await factory
          .put('/balance/10')
          .send(modifiedBalanceFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('with a correct payload', () => {
      it('responds with status 200', async () => {
        const response = await factory
          .put('/balance/1')
          .send(modifiedBalanceFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/updated/);
      });
    });
  });

  describe('Delete balance', () => {
    describe('of unknown id', () => {
      it('responds with status 404', async () => {
        const response = await factory.delete('/balance/10');

        expect(response.statusCode).toBe(404);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('of known id', () => {
      it('responds with status 200', async () => {
        const response = await factory.delete('/balance/1');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/deleted/);
      });
    });
  });
});
