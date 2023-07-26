/* eslint-disable no-undef */
import { HttpStatus } from '@nestjs/common';
import { AbilityFactory } from '../../src/auth/ability.factory';
import { AuthService } from '../../src/auth/auth.service';
import { CardService } from '../../src/card/card.service';
import { Role } from '../../src/user/user.enum';
import { AbilityFactoryMock } from '../ability.mock';
import { TestFactory } from '../factory';
import { userFixture } from '../user/user.seed';
import { cardFixture, modifiedCardFixture } from './card.seed';

describe('Testing card controller', () => {
  // Create instances
  const factory = new TestFactory();
  let service: AuthService;
  let cardService: CardService;

  beforeAll(async () => {
    const moduleRef = await factory.configure();
    moduleRef.overrideProvider(AbilityFactory).useClass(AbilityFactoryMock);
    const module = await factory.init(moduleRef);
    service = module.get<AuthService>(AuthService);
    cardService = module.get<CardService>(CardService);

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
      .spyOn(cardService, 'sendToAnalytics')
      .mockResolvedValue({ status: 200, errors: null });
  });

  describe('Create card', () => {
    describe('with an empty payload', () => {
      it('responds with status 400', async () => {
        const response = await factory.post('/card');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(400);
      });
    });

    describe('with a correct payload', () => {
      it('responds with status 201', async () => {
        const response = await factory.post('/card').send(cardFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(201);
        expect(response.body.shopId).toBe(cardFixture.shopId);
        expect(response.body.userId).toBe(cardFixture.userId);
      });
    });
  });

  describe('Update card', () => {
    describe('of unknown id', () => {
      it('responds with status 404', async () => {
        const response = await factory
          .put('/card/10')
          .send(modifiedCardFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('with a correct payload', () => {
      it('responds with status 200', async () => {
        const response = await factory.put('/card/1').send(modifiedCardFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/updated/);
      });
    });
  });

  describe('Get one card', () => {
    describe('of unknown id', () => {
      it('responds with status 404', async () => {
        const response = await factory.get('/card/10');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('of known id', () => {
      it('responds with status 200', async () => {
        const response = await factory.get('/card/1');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe('Delete card', () => {
    describe('of unknown id', () => {
      it('responds with status 404', async () => {
        const response = await factory.delete('/card/10');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('of known id', () => {
      it('responds with status 200', async () => {
        const response = await factory.delete('/card/1');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/deleted/);
      });
    });
  });
});
