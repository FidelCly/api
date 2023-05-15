/* eslint-disable no-undef */
import { HttpStatus } from '@nestjs/common';
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
  let service: AuthService;

  beforeAll(async () => {
    const moduleRef = await factory.configure();
    const module = await factory.init(moduleRef);
    service = module.get<AuthService>(AuthService);
    await factory.seed();
  });

  afterAll(async () => {
    await factory.close();
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
        const response = await factory.get(`/user/${userFixture.uuid}`);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(HttpStatus.OK);
        expect(response.body.uuid).toBe(userFixture.uuid);
      });
    });

    describe('of another user', () => {
      it('responds with status 403', async () => {
        mockUser(userFixture, Role.User);
        const response = await factory.get(`/user/${userFixture2.uuid}`);

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
          const response = await factory.get(`/shop/1`);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.OK);
          expect(response.body.userId).toBe(1);
        });
      });

      describe('of another user as Fider', () => {
        it('responds with status 403', async () => {
          mockUser(userFixture, Role.Fider);
          const response = await factory.get(`/shop/2`);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
        });
      });

      describe('as User', () => {
        it('responds with status 200', async () => {
          mockUser(userFixture2, Role.User);
          const response = await factory.get(`/shop/1`);

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
          const response = await factory
            .put(`/shop/1`)
            .send(modifiedShopFixture);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.OK);
        });
      });

      describe('of another user as Fider', () => {
        it('responds with status 403', async () => {
          mockUser(userFixture2, Role.Fider);
          const response = await factory
            .put(`/shop/1`)
            .send(modifiedShopFixture);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
        });
      });

      describe('as User', () => {
        it('responds with status 403', async () => {
          mockUser(userFixture2, Role.User);
          const response = await factory
            .put(`/shop/1`)
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
          const response = await factory.get(`/promotion/1`);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.OK);
          expect(response.body.name).toBeDefined();
        });
      });

      describe('of another shop as Fider', () => {
        it('responds with status 403', async () => {
          mockUser(userFixture2, Role.Fider);
          const response = await factory.get(`/promotion/1`);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
        });
      });

      describe('as User', () => {
        it('responds with status 200', async () => {
          mockUser(userFixture2, Role.User);
          const response = await factory.get(`/promotion/1`);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.OK);
          expect(response.body.name).toBeDefined();
        });
      });

      describe('Update promotion', () => {
        describe('of current shop as Fider', () => {
          it('responds with status 200', async () => {
            mockUser(userFixture, Role.Fider);
            const response = await factory
              .put(`/promotion/1`)
              .send(modifiedPromotionFixture);

            expect(response.headers['content-type']).toMatch(/json/);
            expect(response.statusCode).toBe(HttpStatus.OK);
          });
        });

        describe('of another shop as Fider', () => {
          it('responds with status 403', async () => {
            mockUser(userFixture2, Role.Fider);
            const response = await factory
              .put(`/promotion/1`)
              .send(modifiedPromotionFixture);

            expect(response.headers['content-type']).toMatch(/json/);
            expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
          });
        });

        describe('as User', () => {
          it('responds with status 403', async () => {
            mockUser(userFixture2, Role.User);
            const response = await factory
              .put(`/promotion/1`)
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
          const response = await factory.get(`/card/1`);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.OK);
          expect(response.body.shopId).toBeDefined();
        });
      });

      describe('of another shop as Fider', () => {
        it('responds with status 403', async () => {
          mockUser(userFixture2, Role.Fider);
          const response = await factory.get(`/card/1`);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
        });
      });

      describe('of current user as User', () => {
        it('responds with status 200', async () => {
          mockUser(userFixture, Role.User);
          const response = await factory.get(`/card/1`);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.OK);
          expect(response.body.shopId).toBeDefined();
        });
      });

      describe('of another user as User', () => {
        it('responds with status 403', async () => {
          mockUser(userFixture2, Role.User);
          const response = await factory.get(`/card/1`);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
        });
      });
    });

    describe('Update card', () => {
      describe('of current shop as Fider', () => {
        it('responds with status 200', async () => {
          mockUser(userFixture, Role.Fider);
          const response = await factory
            .put(`/card/1`)
            .send(modifiedCardFixture);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.OK);
        });
      });

      describe('of another shop as Fider', () => {
        it('responds with status 403', async () => {
          mockUser(userFixture2, Role.Fider);
          const response = await factory
            .put(`/card/1`)
            .send(modifiedCardFixture);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
        });
      });

      describe('as User', () => {
        it('responds with status 403', async () => {
          mockUser(userFixture, Role.User);
          const response = await factory
            .put(`/card/1`)
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
          const response = await factory.get(`/balance/1`);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.OK);
          expect(response.body.cardId).toBeDefined();
        });
      });

      describe('of another shop as Fider', () => {
        it('responds with status 403', async () => {
          mockUser(userFixture2, Role.Fider);
          const response = await factory.get(`/balance/1`);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
        });
      });

      describe('of current user as User', () => {
        it('responds with status 200', async () => {
          mockUser(userFixture, Role.User);
          const response = await factory.get(`/balance/1`);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.OK);
          expect(response.body.cardId).toBeDefined();
        });
      });

      describe('of another user as User', () => {
        it('responds with status 403', async () => {
          mockUser(userFixture2, Role.User);
          const response = await factory.get(`/balance/1`);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
        });
      });
    });

    describe('Update balance', () => {
      describe('of current shop as Fider', () => {
        it('responds with status 200', async () => {
          mockUser(userFixture, Role.Fider);
          const response = await factory
            .put(`/balance/1`)
            .send(modifiedBalanceFixture);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.OK);
        });
      });

      describe('of another shop as Fider', () => {
        it('responds with status 403', async () => {
          mockUser(userFixture2, Role.Fider);
          const response = await factory
            .put(`/balance/1`)
            .send(modifiedBalanceFixture);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
        });
      });

      describe('as User', () => {
        it('responds with status 403', async () => {
          mockUser(userFixture, Role.User);
          const response = await factory
            .put(`/balance/1`)
            .send(modifiedBalanceFixture);

          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
        });
      });
    });
  });
});
