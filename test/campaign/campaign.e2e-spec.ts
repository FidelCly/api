/* eslint-disable no-undef */
import { HttpStatus } from '@nestjs/common';
import {
  campaignFixture,
  campaignFixtureWithId,
  campaignFixtureWithoutId,
  modifiedCampaignFixture,
} from './campaign.seed';
import { TestFactory } from '../factory';
import { CampaignService } from '../../src/campaign/campaign.service';
import { AuthService } from '../../src/auth/auth.service';
import { Role } from '../../src/user/user.enum';
import { userFixture2 } from '../user/user.seed';
import { shopFixture } from '../shop/shop.seed';
import { AbilityFactory } from '../../src/auth/ability.factory';
import { AbilityFactoryMock } from '../ability.mock';

describe('Testing campaign controller', () => {
  // Create instances
  const factory = new TestFactory();
  let service: CampaignService;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleRef = await factory.configure();
    moduleRef.overrideProvider(AbilityFactory).useClass(AbilityFactoryMock);
    const module = await factory.init(moduleRef);
    service = module.get<CampaignService>(CampaignService);
    authService = module.get<AuthService>(AuthService);

    await factory.seedUser();
    await factory.seedUser(userFixture2);
    await factory.seedShop(shopFixture, 2);
    await factory.seedCard();
  });

  afterAll(async () => {
    await factory.close();
  });

  beforeEach(() => {
    jest.spyOn(authService, 'validate').mockResolvedValue({
      status: HttpStatus.OK,
      userUuid: userFixture2.uuid,
      role: Role.Fider,
      errors: null,
    });
  });

  describe('Create campaign', () => {
    describe('with an empty payload', () => {
      it('responds with status 400', async () => {
        const response = await factory.post('/campaign');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body.message.length).toBeGreaterThan(0);
      });
    });

    describe('with a correct payload', () => {
      it('responds with status 200', async () => {
        const response = await factory.post('/campaign').send(campaignFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(HttpStatus.CREATED);
        expect(response.body.errors).toBeUndefined;
      });
    });
  });

  describe('Send campaign', () => {
    describe('with an empty payload', () => {
      it('responds with status 400', async () => {
        const response = await factory.post('/campaign/send');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body.message.length).toBeGreaterThan(0);
      });
    });

    describe('with a correct payload and no id', () => {
      it('responds with status 200', async () => {
        jest.spyOn(service, 'send').mockResolvedValue({
          status: HttpStatus.OK,
          errors: null,
        });

        const response = await factory
          .post('/campaign/send')
          .send(campaignFixtureWithoutId);

        console.debug(response.body);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(HttpStatus.OK);
        expect(response.body.errors).toBeUndefined;
      });
    });

    describe('with a correct payload and id', () => {
      it('responds with status 200', async () => {
        jest.spyOn(service, 'send').mockResolvedValue({
          status: HttpStatus.OK,
          errors: null,
        });

        const response = await factory
          .post('/campaign/send')
          .send(campaignFixtureWithId);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(HttpStatus.OK);
        expect(response.body.errors).toBeUndefined;
      });
    });
  });

  describe('Update campaign', () => {
    describe('of unknown id', () => {
      it('responds with status 404', async () => {
        const response = await factory
          .put('/campaign/10')
          .send(modifiedCampaignFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('with a correct payload', () => {
      it('responds with status 200', async () => {
        const response = await factory
          .put('/campaign/1')
          .send(modifiedCampaignFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/updated/);
      });
    });
  });

  describe('Get one campaign', () => {
    describe('of unknown id', () => {
      it('responds with status 404', async () => {
        const response = await factory.get('/campaign/10');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('of known id', () => {
      it('responds with status 200', async () => {
        const response = await factory.get('/campaign/1');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe('Delete campaign', () => {
    describe('of unknown id', () => {
      it('responds with status 404', async () => {
        const response = await factory.delete('/campaign/10');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('of known id', () => {
      it('responds with status 200', async () => {
        const response = await factory.delete('/campaign/1');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/deleted/);
      });
    });
  });
});
