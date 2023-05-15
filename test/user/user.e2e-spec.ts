import { HttpServer, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { TestFactory } from '../factory';
import {
  emptyModifiedUserFixture,
  modifiedUserFixture,
  userFixture,
} from './user.seed';
import { AbilityFactory } from '../../src/auth/ability.factory';
import { AbilityFactoryMock } from '../ability.mock';
import { AuthService } from '../../src/auth/auth.service';
import { Role } from '../../src/user/user.enum';

describe('UsersController', () => {
  // Create instances
  const factory: TestFactory = new TestFactory();
  let app: HttpServer;
  let service: AuthService;

  beforeAll(async () => {
    const moduleRef = await factory.configure();
    moduleRef.overrideProvider(AbilityFactory).useClass(AbilityFactoryMock);
    const module = await factory.init(moduleRef);
    service = module.get<AuthService>(AuthService);

    await factory.seedUser();

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

  describe('Update user', () => {
    describe('of unknown id', () => {
      it('responds with status 404', async () => {
        const response = await request(app)
          .put('/user/10')
          .set('Authorization', 'bearer some-token')
          .set('Accept', 'application/json')
          .send(modifiedUserFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('with incorrect payload', () => {
      it('responds with status 400', async () => {
        const response = await request(app)
          .put('/user/1')
          .set('Authorization', 'bearer some-token')
          .set('Accept', 'application/json')
          .send(emptyModifiedUserFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(400);
      });
    });

    describe('with a correct payload', () => {
      it('responds with status 200', async () => {
        const response = await request(app)
          .put('/user/1')
          .set('Authorization', 'bearer some-token')
          .set('Accept', 'application/json')
          .send(modifiedUserFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/updated/);
      });
    });
  });

  describe('Get one user', () => {
    describe('of unknown uuid', () => {
      it('responds with status 404', async () => {
        const response = await request(app)
          .get('/user/some-unknown-uuid')
          .set('Authorization', 'bearer some-token')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('of known uuid', () => {
      it('responds with status 200', async () => {
        const response = await request(app)
          .get('/user/some-uuid')
          .set('Authorization', 'bearer some-token')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe('Delete user', () => {
    describe('of unknown id', () => {
      it('responds with status 404', async () => {
        const response = await request(app)
          .delete('/user/10')
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
          .delete('/user/1')
          .set('Authorization', 'bearer some-token')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/deleted/);
      });
    });
  });
});
