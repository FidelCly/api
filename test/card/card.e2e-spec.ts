/* eslint-disable no-undef */
import { HttpServer, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { TestFactory } from '../factory';
import { cardFixture, modifiedCardFixture } from './card.seed';
import { AbilityFactory } from '../../src/auth/ability.factory';
import { AbilityFactoryMock } from '../ability.mock';
import { AuthService } from '../../src/auth/auth.service';
import { Role } from '../../src/user/user.enum';
import { userFixture } from '../user/user.seed';

describe('Testing card controller', () => {
  // Create instances
  const factory = new TestFactory();
  let app: HttpServer;
  let service: AuthService;

  beforeAll(async () => {
    const moduleRef = await factory.configure();
    moduleRef.overrideProvider(AbilityFactory).useClass(AbilityFactoryMock);
    const module = await factory.init(moduleRef);
    service = module.get<AuthService>(AuthService);

    await factory.seedUser();
    await factory.seedShop();

    app = factory.app.getHttpServer();
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
  });

  describe('Create card', () => {
    describe('with an empty payload', () => {
      it('responds with status 400', async () => {
        const response = await request(app)
          .post('/card')
          .set('Authorization', 'bearer some-token')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(400);
      });
    });

    describe('with a correct payload', () => {
      it('responds with status 201', async () => {
        const response = await request(app)
          .post('/card')
          .set('Authorization', 'bearer some-token')
          .set('Accept', 'application/json')
          .send(cardFixture);

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
        const response = await request(app)
          .put('/card/10')
          .set('Authorization', 'bearer some-token')
          .set('Accept', 'application/json')
          .send(modifiedCardFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('with a correct payload', () => {
      it('responds with status 200', async () => {
        const response = await request(app)
          .put('/card/1')
          .set('Authorization', 'bearer some-token')
          .set('Accept', 'application/json')
          .send(modifiedCardFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/updated/);
      });
    });
  });

  describe('Get one card', () => {
    describe('of unknown id', () => {
      it('responds with status 404', async () => {
        const response = await request(app)
          .get('/card/10')
          .set('Authorization', 'bearer some-token')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('of known id', () => {
      it('responds with status 200', async () => {
        const response = await request(app)
          .get('/card/1')
          .set('Authorization', 'bearer some-token')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe('Delete card', () => {
    describe('of unknown id', () => {
      it('responds with status 404', async () => {
        const response = await request(app)
          .delete('/card/10')
          .set('Authorization', 'bearer some-token')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('of known id', () => {
      it('responds with status 200', async () => {
        const response = await request(app)
          .delete('/card/1')
          .set('Authorization', 'bearer some-token')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/deleted/);
      });
    });
  });
});
