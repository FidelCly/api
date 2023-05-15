/* eslint-disable no-undef */
import * as request from 'supertest';
import { HttpServer, HttpStatus } from '@nestjs/common';
import { AuthService } from '../../src/auth/auth.service';
import { TestFactory } from '../factory';
import { userFixture, userFixture2 } from '../user/user.seed';
import { modifiedPromotionFixture } from '../promotion/promotion.seed';
import { modifiedShopFixture } from '../shop/shop.seed';
import { modifiedCardFixture } from '../card/card.seed';
import { modifiedBalanceFixture } from '../balance/balance.seed';
import { CreateUserDto } from '../../src/user/user.dto';
import { Role } from '../../src/user/user.enum';

describe('Testing authorization', () => {
  // Create instances
  const factory = new TestFactory();
  let app: HttpServer;
  let service: AuthService;

  beforeAll(async () => {
    const moduleRef = await factory.configure();
    const module = await factory.init(moduleRef);
    service = module.get<AuthService>(AuthService);
    await factory.seed();

    app = factory.app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  function mockUser(fixture: CreateUserDto, role: Role) {
    jest.spyOn(service, 'validate').mockResolvedValue({
      status: HttpStatus.OK,
      userUuid: fixture.uuid,
      role: role,
      errors: null,
    });
  }

  describe('Manage user', () => {
    describe('of current user', () => {
      it('responds with status 200', async () => {
        mockUser(userFixture, Role.Fider);
        const response = await request(app)
          .get(`/user/${userFixture.uuid}`)
          .set('Accept', 'application/json')
          .set('Authorization', 'bearer some-token');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(HttpStatus.OK);
        expect(response.body.uuid).toBe(userFixture.uuid);
      });
    });

    describe('of another user', () => {
      it('responds with status 403', async () => {
        mockUser(userFixture, Role.User);
        const response = await request(app)
          .get(`/user/${userFixture2.uuid}`)
          .set('Accept', 'application/json')
          .set('Authorization', 'bearer some-token');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
      });
    });
  });

  describe('Manage shop', () => {
    describe('Get shop', () => {
      describe('of current user as Fider', () => {
        it('responds with status 200', async () => {
          mockUser(userFixture, Role.Fider);
          const response = await request(app)
            .get(`/shop/1`)
            .set('Accept', 'application/json')
            .set('Authorization', 'bearer some-token');

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.OK);
          expect(response.body.userId).toBe(1);
        });
      });

      describe('of another user as Fider', () => {
        it('responds with status 403', async () => {
          mockUser(userFixture, Role.Fider);
          const response = await request(app)
            .get(`/shop/2`)
            .set('Accept', 'application/json')
            .set('Authorization', 'bearer some-token');

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
        });
      });

      describe('as User', () => {
        it('responds with status 200', async () => {
          mockUser(userFixture2, Role.User);
          const response = await request(app)
            .get(`/shop/1`)
            .set('Accept', 'application/json')
            .set('Authorization', 'bearer some-token');

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.OK);
          expect(response.body.companyName).toBeDefined();
        });
      });
    });

    describe('Update shop', () => {
      describe('of current user as Fider', () => {
        it('responds with status 200', async () => {
          mockUser(userFixture, Role.Fider);
          const response = await request(app)
            .put(`/shop/1`)
            .set('Accept', 'application/json')
            .set('Authorization', 'bearer some-token')
            .send(modifiedShopFixture);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.OK);
        });
      });

      describe('of another user as Fider', () => {
        it('responds with status 403', async () => {
          mockUser(userFixture2, Role.Fider);
          const response = await request(app)
            .put(`/shop/1`)
            .set('Accept', 'application/json')
            .set('Authorization', 'bearer some-token')
            .send(modifiedShopFixture);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
        });
      });

      describe('as User', () => {
        it('responds with status 403', async () => {
          mockUser(userFixture2, Role.User);
          const response = await request(app)
            .put(`/shop/1`)
            .set('Accept', 'application/json')
            .set('Authorization', 'bearer some-token')
            .send(modifiedShopFixture);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
        });
      });
    });
  });

  describe('Manage promotion', () => {
    describe('Get promotion', () => {
      describe('of current shop as Fider', () => {
        it('responds with status 200', async () => {
          mockUser(userFixture, Role.Fider);
          const response = await request(app)
            .get(`/promotion/1`)
            .set('Accept', 'application/json')
            .set('Authorization', 'bearer some-token');

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.OK);
          expect(response.body.name).toBeDefined();
        });
      });

      describe('of another shop as Fider', () => {
        it('responds with status 403', async () => {
          mockUser(userFixture2, Role.Fider);
          const response = await request(app)
            .get(`/promotion/1`)
            .set('Accept', 'application/json')
            .set('Authorization', 'bearer some-token');

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
        });
      });

      describe('as User', () => {
        it('responds with status 200', async () => {
          mockUser(userFixture2, Role.User);
          const response = await request(app)
            .get(`/promotion/1`)
            .set('Accept', 'application/json')
            .set('Authorization', 'bearer some-token');

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.OK);
          expect(response.body.name).toBeDefined();
        });
      });

      describe('Update promotion', () => {
        describe('of current shop as Fider', () => {
          it('responds with status 200', async () => {
            mockUser(userFixture, Role.Fider);
            const response = await request(app)
              .put(`/promotion/1`)
              .set('Accept', 'application/json')
              .set('Authorization', 'bearer some-token')
              .send(modifiedPromotionFixture);

            expect(response.headers['content-type']).toMatch(/json/);
            expect(response.statusCode).toBe(HttpStatus.OK);
          });
        });

        describe('of another shop as Fider', () => {
          it('responds with status 403', async () => {
            mockUser(userFixture2, Role.Fider);
            const response = await request(app)
              .put(`/promotion/1`)
              .set('Accept', 'application/json')
              .set('Authorization', 'bearer some-token')
              .send(modifiedPromotionFixture);

            expect(response.headers['content-type']).toMatch(/json/);
            expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
          });
        });

        describe('as User', () => {
          it('responds with status 403', async () => {
            mockUser(userFixture2, Role.User);
            const response = await request(app)
              .put(`/promotion/1`)
              .set('Accept', 'application/json')
              .set('Authorization', 'bearer some-token')
              .send(modifiedPromotionFixture);

            expect(response.headers['content-type']).toMatch(/json/);
            expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
          });
        });
      });
    });
  });

  describe('Manage card', () => {
    describe('Get card', () => {
      describe('of current shop as Fider', () => {
        it('responds with status 200', async () => {
          mockUser(userFixture, Role.Fider);
          const response = await request(app)
            .get(`/card/1`)
            .set('Accept', 'application/json')
            .set('Authorization', 'bearer some-token');

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.OK);
          expect(response.body.shopId).toBeDefined();
        });
      });

      describe('of another shop as Fider', () => {
        it('responds with status 403', async () => {
          mockUser(userFixture2, Role.Fider);
          const response = await request(app)
            .get(`/card/1`)
            .set('Accept', 'application/json')
            .set('Authorization', 'bearer some-token');

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
        });
      });

      describe('of current user as User', () => {
        it('responds with status 200', async () => {
          mockUser(userFixture, Role.User);
          const response = await request(app)
            .get(`/card/1`)
            .set('Accept', 'application/json')
            .set('Authorization', 'bearer some-token');

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.OK);
          expect(response.body.shopId).toBeDefined();
        });
      });

      describe('of another user as User', () => {
        it('responds with status 403', async () => {
          mockUser(userFixture2, Role.User);
          const response = await request(app)
            .get(`/card/1`)
            .set('Accept', 'application/json')
            .set('Authorization', 'bearer some-token');

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
        });
      });
    });

    describe('Update card', () => {
      describe('of current shop as Fider', () => {
        it('responds with status 200', async () => {
          mockUser(userFixture, Role.Fider);
          const response = await request(app)
            .put(`/card/1`)
            .set('Accept', 'application/json')
            .set('Authorization', 'bearer some-token')
            .send(modifiedCardFixture);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.OK);
        });
      });

      describe('of another shop as Fider', () => {
        it('responds with status 403', async () => {
          mockUser(userFixture2, Role.Fider);
          const response = await request(app)
            .put(`/card/1`)
            .set('Accept', 'application/json')
            .set('Authorization', 'bearer some-token')
            .send(modifiedCardFixture);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
        });
      });

      describe('as User', () => {
        it('responds with status 403', async () => {
          mockUser(userFixture, Role.User);
          const response = await request(app)
            .put(`/card/1`)
            .set('Accept', 'application/json')
            .set('Authorization', 'bearer some-token')
            .send(modifiedCardFixture);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
        });
      });
    });
  });

  describe('Manage balance', () => {
    describe('Get balance', () => {
      describe('of current shop as Fider', () => {
        it('responds with status 200', async () => {
          mockUser(userFixture, Role.Fider);
          const response = await request(app)
            .get(`/balance/1`)
            .set('Accept', 'application/json')
            .set('Authorization', 'bearer some-token');

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.OK);
          expect(response.body.cardId).toBeDefined();
        });
      });

      describe('of another shop as Fider', () => {
        it('responds with status 403', async () => {
          mockUser(userFixture2, Role.Fider);
          const response = await request(app)
            .get(`/balance/1`)
            .set('Accept', 'application/json')
            .set('Authorization', 'bearer some-token');

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
        });
      });

      describe('of current user as User', () => {
        it('responds with status 200', async () => {
          mockUser(userFixture, Role.User);
          const response = await request(app)
            .get(`/balance/1`)
            .set('Accept', 'application/json')
            .set('Authorization', 'bearer some-token');

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.OK);
          expect(response.body.cardId).toBeDefined();
        });
      });

      describe('of another user as User', () => {
        it('responds with status 403', async () => {
          mockUser(userFixture2, Role.User);
          const response = await request(app)
            .get(`/balance/1`)
            .set('Accept', 'application/json')
            .set('Authorization', 'bearer some-token');

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
        });
      });
    });

    describe('Update balance', () => {
      describe('of current shop as Fider', () => {
        it('responds with status 200', async () => {
          mockUser(userFixture, Role.Fider);
          const response = await request(app)
            .put(`/balance/1`)
            .set('Accept', 'application/json')
            .set('Authorization', 'bearer some-token')
            .send(modifiedBalanceFixture);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.OK);
        });
      });

      describe('of another shop as Fider', () => {
        it('responds with status 403', async () => {
          mockUser(userFixture2, Role.Fider);
          const response = await request(app)
            .put(`/balance/1`)
            .set('Accept', 'application/json')
            .set('Authorization', 'bearer some-token')
            .send(modifiedBalanceFixture);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
        });
      });

      describe('as User', () => {
        it('responds with status 403', async () => {
          mockUser(userFixture, Role.User);
          const response = await request(app)
            .put(`/balance/1`)
            .set('Accept', 'application/json')
            .set('Authorization', 'bearer some-token')
            .send(modifiedBalanceFixture);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
        });
      });
    });
  });
});
