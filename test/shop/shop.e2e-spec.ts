import { HttpServer } from '@nestjs/common';
import * as request from 'supertest';
import { TestFactory } from '../factory';
import {
  shopFixture,
  modifiedShopFixture,
  emptyModifiedShopFixture,
  farAwayShopFixture,
} from './shop.seed';
import { userFixture2 } from '../user/user.seed';

describe('Testing shop controller', () => {
  // Create instances
  const factory = new TestFactory();
  let app: HttpServer;

  beforeAll(async () => {
    const module = await factory.configure();
    await factory.init(module);

    await factory.seedUser();
    await factory.seedUser(userFixture2);

    app = factory.app.getHttpServer();
  });

  afterAll(async () => {
    await factory.close();
  });

  describe('Create shop', () => {
    describe('with an empty payload', () => {
      it('responds with status 400', async () => {
        const response = await request(app)
          .post('/shop')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(400);
      });
    });

    describe('with a correct payload', () => {
      it('responds with status 201', async () => {
        const response = await request(app)
          .post('/shop')
          .send(shopFixture)
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(201);
        expect(response.body.companyName).toBe(shopFixture.companyName);
        expect(response.body.email).toBe(shopFixture.email);
      });
    });
  });

  describe('Update shop', () => {
    describe('of unknown id', () => {
      it('responds with status 404', async () => {
        const response = await request(app)
          .put('/shop/10')
          .set('Accept', 'application/json')
          .send(modifiedShopFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('with incorrect payload', () => {
      it('responds with status 400', async () => {
        const response = await request(app)
          .put('/shop/1')
          .set('Accept', 'application/json')
          .send(emptyModifiedShopFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(400);
      });
    });

    describe('of known id', () => {
      it('responds with status 200', async () => {
        const response = await request(app)
          .put('/shop/1')
          .set('Accept', 'application/json')
          .send(modifiedShopFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/updated/);
      });
    });
  });

  describe('Get one shop', () => {
    describe('of unknown id', () => {
      it('responds with status 404', async () => {
        const response = await request(app)
          .get('/shop/10')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('of known id', () => {
      it('responds with status 200', async () => {
        const response = await request(app)
          .get('/shop/1')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe('Get all shops', () => {
    describe('without filters', () => {
      it('responds with status 200', async () => {
        const response = await request(app)
          .get('/shop/')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
      });
    });

    describe('with location fitlers', () => {
      it('responds with status 200', async () => {
        await factory.seedShop(farAwayShopFixture);

        const response = await request(app)
          .get('/shop/?distance=3000&long=2.3690961&lat=48.8573185')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
      });
    });
  });

  describe("Get one shop's promotions", () => {
    describe('of known id', () => {
      it('responds with status 200', async () => {
        const response = await request(app)
          .get('/shop/1/promotions')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe("Get one shop's clients", () => {
    describe('of known id', () => {
      it('responds with status 200', async () => {
        await factory.seedUser();
        await factory.seedCard();

        const response = await request(app)
          .get('/shop/1/clients')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(1);
      });
    });
  });

  describe('Delete shop', () => {
    describe('of unknown id', () => {
      it('responds with status 404', async () => {
        const response = await request(app)
          .delete('/shop/10')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('of known id', () => {
      it('responds with status 200', async () => {
        const response = await request(app)
          .delete('/shop/1')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/deleted/);
      });
    });
  });
});
