/* eslint-disable no-undef */
import { HttpStatus } from '@nestjs/common';
import { AuthService } from '../../src/auth/auth.service';
import { TestFactory } from '../factory';
import { userFixture } from '../user/user.seed';
import { Role } from '../../src/user/user.enum';
import { AnalyticsService } from '../../src/analytics/analytics.service';

describe('Testing analytics controller', () => {
  // Create instances
  const factory = new TestFactory();
  let authService: AuthService;
  let service: AnalyticsService;

  beforeAll(async () => {
    const moduleRef = await factory.configure();
    const module = await factory.init(moduleRef);
    authService = module.get<AuthService>(AuthService);
    service = module.get<AnalyticsService>(AnalyticsService);

    await factory.seedUser();
    await factory.seedShop();
  });

  afterAll(async () => {
    await factory.close();
  });

  describe('Get Affluence', () => {
    describe('with a correct payload', () => {
      it('responds with status 200', async () => {
        jest.spyOn(authService, 'validate').mockResolvedValue({
          status: HttpStatus.OK,
          userUuid: userFixture.uuid,
          role: Role.Fider,
          errors: null,
        });

        jest.spyOn(service, 'affluence').mockResolvedValue({
          status: HttpStatus.OK,
          value: 20,
          errors: null,
        });

        const response = await factory.get(
          '/analytics/affluence?start_date=2022-09-27&end_date=2023-09-27',
        );

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(HttpStatus.OK);
        expect(response.body.value).toBe(20);
      });
    });

    describe('with incorrect payload', () => {
      it('responds with status 200', async () => {
        jest.spyOn(authService, 'validate').mockResolvedValue({
          status: HttpStatus.OK,
          userUuid: userFixture.uuid,
          role: Role.Fider,
          errors: null,
        });

        const response = await factory.get(
          '/analytics/affluence?start_date=xxx&end_date=yyy',
        );

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });
    });
  });

  describe('Get Clients Count', () => {
    describe('with a correct payload', () => {
      it('responds with status 200', async () => {
        jest.spyOn(authService, 'validate').mockResolvedValue({
          status: HttpStatus.OK,
          userUuid: userFixture.uuid,
          role: Role.Fider,
          errors: null,
        });

        jest.spyOn(service, 'clientsCount').mockResolvedValue({
          status: HttpStatus.OK,
          value: 20,
          errors: null,
        });

        const response = await factory.get(
          '/analytics/clients-count?start_date=2022-09-27&end_date=2023-09-27',
        );

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(HttpStatus.OK);
        expect(response.body.value).toBe(20);
      });
    });

    describe('with incorrect payload', () => {
      it('responds with status 200', async () => {
        jest.spyOn(authService, 'validate').mockResolvedValue({
          status: HttpStatus.OK,
          userUuid: userFixture.uuid,
          role: Role.Fider,
          errors: null,
        });

        const response = await factory.get(
          '/analytics/clients-count?start_date=xxx&end_date=yyy',
        );

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });
    });
  });

  describe('Get Promotions Ranking', () => {
    describe('with a correct payload', () => {
      it('responds with status 200', async () => {
        jest.spyOn(authService, 'validate').mockResolvedValue({
          status: HttpStatus.OK,
          userUuid: userFixture.uuid,
          role: Role.Fider,
          errors: null,
        });

        jest.spyOn(service, 'promotionsRanking').mockResolvedValue({
          status: HttpStatus.OK,
          promotionNames: ['first promotion', 'second promotion'],
          values: [31, 15],
          errors: null,
        });

        const response = await factory.get(
          '/analytics/promotions-ranking?start_date=2022-09-27&end_date=2023-09-27',
        );

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(HttpStatus.OK);
        expect(response.body.values).toContain(31);
        expect(response.body.values).toContain(15);
        expect(response.body.promotionNames).toContain('first promotion');
        expect(response.body.promotionNames).toContain('second promotion');
      });
    });

    describe('with incorrect payload', () => {
      it('responds with status 200', async () => {
        jest.spyOn(authService, 'validate').mockResolvedValue({
          status: HttpStatus.OK,
          userUuid: userFixture.uuid,
          role: Role.Fider,
          errors: null,
        });

        const response = await factory.get(
          '/analytics/promotions-ranking?start_date=xxx&end_date=yyy',
        );

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });
    });
  });

  describe('Get Promotion Checkouts Count', () => {
    describe('with a correct payload', () => {
      it('responds with status 200', async () => {
        jest.spyOn(authService, 'validate').mockResolvedValue({
          status: HttpStatus.OK,
          userUuid: userFixture.uuid,
          role: Role.Fider,
          errors: null,
        });

        jest.spyOn(service, 'promotionCheckoutsCount').mockResolvedValue({
          status: HttpStatus.OK,
          value: 20,
          errors: null,
        });

        const response = await factory.get(
          '/analytics/promotion-checkout-count/1?start_date=2022-09-27&end_date=2023-09-27',
        );

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(HttpStatus.OK);
        expect(response.body.value).toBe(20);
      });
    });

    describe('with a correct payload and unknown promotion', () => {
      it('responds with status 404', async () => {
        jest.spyOn(authService, 'validate').mockResolvedValue({
          status: HttpStatus.OK,
          userUuid: userFixture.uuid,
          role: Role.Fider,
          errors: null,
        });

        jest.spyOn(service, 'promotionCheckoutsCount').mockResolvedValue({
          status: HttpStatus.NOT_FOUND,
          value: null,
          errors: ['Promotion not found'],
        });

        const response = await factory.get(
          '/analytics/promotion-checkout-count/10?start_date=2022-09-27&end_date=2023-09-27',
        );

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
        expect(response.body.value).toBeUndefined();
        expect(response.body.error).toBeDefined();
      });
    });

    describe('with incorrect payload', () => {
      it('responds with status 200', async () => {
        jest.spyOn(authService, 'validate').mockResolvedValue({
          status: HttpStatus.OK,
          userUuid: userFixture.uuid,
          role: Role.Fider,
          errors: null,
        });

        const response = await factory.get(
          '/analytics/promotion-checkout-count/1?start_date=xxx&end_date=yyy',
        );

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });
    });
  });
});
