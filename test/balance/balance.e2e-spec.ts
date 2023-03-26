/* eslint-disable no-undef */
import * as request from 'supertest';
import { HttpServer } from '@nestjs/common';
import { TestFactory } from '../factory';
import { balanceFixture, modifiedBalanceFixture } from './balance.seed';

describe('Testing balance controller', () => {
  // Create instances
  const factory = new TestFactory();
  let app: HttpServer;

  beforeAll(async () => {
    await factory.init();
    await factory.seedUser();
    await factory.seedShop();
    await factory.seedCard();
    await factory.seedPromotion();

    app = factory.app.getHttpServer();
  }, 10000);

  afterAll(async () => {
    await factory.close();
  });

  describe('Create balance', () => {
    describe('with an empty payload', () => {
      it('responds with status 400', async () => {
        const response = await request(app)
          .post('/balance')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(400);
      });
    });

    describe('with a correct payload', () => {
      it('responds with status 201', async () => {
        const response = await request(app)
          .post('/balance')
          .set('Accept', 'application/json')
          .send(balanceFixture);

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
        const response = await request(app)
          .put('/balance/10')
          .set('Accept', 'application/json')
          .send(modifiedBalanceFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('with a correct payload', () => {
      it('responds with status 200', async () => {
        const response = await request(app)
          .put('/balance/1')
          .set('Accept', 'application/json')
          .send(modifiedBalanceFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/updated/);
      });
    });
  });

  describe('Checkout balance', () => {
    describe('of unknown id', () => {
      it('responds with status 404', async () => {
        const response = await request(app)
          .put('/balance/10/checkout')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('of known id', () => {
      it('responds with status 200', async () => {
        const response = await request(app)
          .put('/balance/1/checkout')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/updated/);
      });
    });
  });

  describe('Delete balance', () => {
    describe('of unknown id', () => {
      it('responds with status 404', async () => {
        const response = await request(app)
          .delete('/balance/10')
          .set('Accept', 'application/json');

        expect(response.statusCode).toBe(404);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('of known id', () => {
      it('responds with status 200', async () => {
        const response = await request(app)
          .delete('/balance/1')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/deleted/);
      });
    });
  });
});
