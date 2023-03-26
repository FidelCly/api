/* eslint-disable no-undef */
import { HttpServer } from '@nestjs/common';
import * as request from 'supertest';
import { TestFactory } from '../factory';
import { cardFixture, modifiedCardFixture } from './card.seed';

describe('Testing card controller', () => {
  // Create instances
  const factory = new TestFactory();
  let app: HttpServer;

  beforeAll(async () => {
    await factory.init();

    await factory.seedUser();
    await factory.seedShop();

    app = factory.app.getHttpServer();
  }, 10000);

  afterAll(async () => {
    await factory.close();
  });

  describe('Create card', () => {
    describe('with an empty payload', () => {
      it('responds with status 400', async () => {
        const response = await request(app)
          .post('/card')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(400);
      });
    });

    describe('with a correct payload', () => {
      it('responds with status 201', async () => {
        const response = await request(app)
          .post('/card')
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
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/deleted/);
      });
    });
  });
});
