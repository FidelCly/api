/* eslint-disable no-undef */
import { HttpServer } from '@nestjs/common';
import * as request from 'supertest';
import { TestFactory } from '../factory';
import {
  promotionFixture,
  modifiedPromotionFixture,
  modifiedEmptyPromotionFixture,
} from './promotion.seed';

describe('Testing promotion controller', () => {
  // Create instances
  const factory = new TestFactory();
  let app: HttpServer;

  beforeAll(async () => {
    await factory.init();

    await factory.seedShop();

    app = factory.app.getHttpServer();
  }, 10000);

  afterAll(async () => {
    await factory.close();
  });

  describe('Create promotion', () => {
    describe('with an empty payload', () => {
      it('responds with status 400', async () => {
        const response = await request(app)
          .post('/promotion')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(400);
      });
    });

    describe('with a correct payload', () => {
      it('responds with status 201', async () => {
        const response = await request(app)
          .post('/promotion')
          .set('Accept', 'application/json')
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
        const response = await request(app)
          .put('/promotion/10')
          .set('Accept', 'application/json')
          .send(modifiedPromotionFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('with incorrect payload', () => {
      it('responds with status 400', async () => {
        const response = await request(app)
          .put('/promotion/1')
          .set('Accept', 'application/json')
          .send(modifiedEmptyPromotionFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(400);
      });
    });

    describe('with a correct payload', () => {
      it('responds with status 200', async () => {
        const response = await request(app)
          .put('/promotion/1')
          .set('Accept', 'application/json')
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
        const response = await request(app)
          .delete('/promotion/10')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('of known id', () => {
      it('responds with status 200', async () => {
        const response = await request(app)
          .delete('/promotion/1')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/deleted/);
      });
    });
  });
});
