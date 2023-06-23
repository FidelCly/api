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
  });
});
