import * as request from 'supertest';
import {
  userFixture,
  modifiedUserFixture,
  emptyModifiedUserFixture,
} from './user.seed';
import { TestFactory } from '../factory';
import { HttpServer } from '@nestjs/common';

describe('UsersController', () => {
  // Create instances
  const factory: TestFactory = new TestFactory();
  let app: HttpServer;

  beforeAll(async () => {
    await factory.init();

    app = factory.app.getHttpServer();
  });

  afterAll(async () => {
    await factory.close();
  });

  describe('Create user', () => {
    describe('with an empty payload', () => {
      it('responds with status 400', async () => {
        const response = await request(app)
          .post('/user')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(400);
      });
    });

    describe('with a correct payload', () => {
      it('responds with status 201', async () => {
        const response = await request(app)
          .post('/user')
          .set('Accept', 'application/json')
          .send(userFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(201);
        expect(response.body.username).toBe(userFixture.username);
        expect(response.body.email).toBe(userFixture.email);
      });
    });
  });

  describe('Update user', () => {
    describe('of unknown id', () => {
      it('responds with status 404', async () => {
        const response = await request(app)
          .put('/user/10')
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
          .set('Accept', 'application/json')
          .send(modifiedUserFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/updated/);
      });
    });
  });

  describe('Get one user', () => {
    describe('of unknown id', () => {
      it('responds with status 404', async () => {
        const response = await request(app)
          .get('/user/10')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('of known id', () => {
      it('responds with status 200', async () => {
        const response = await request(app)
          .get('/user/1')
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
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/deleted/);
      });
    });
  });
});
