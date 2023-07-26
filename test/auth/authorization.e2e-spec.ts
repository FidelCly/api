/* eslint-disable no-undef */
import { HttpStatus } from '@nestjs/common';
import { AuthService } from '../../src/auth/auth.service';
import { BalanceService } from '../../src/balance/balance.service';
import { CardService } from '../../src/card/card.service';
import { PromotionService } from '../../src/promotion/promotion.service';
import { ShopService } from '../../src/shop/shop.service';
import { CreateUserDto } from '../../src/user/user.dto';
import { Role } from '../../src/user/user.enum';
import { modifiedBalanceFixture } from '../balance/balance.seed';
import { modifiedCardFixture } from '../card/card.seed';
import { TestFactory } from '../factory';
import { modifiedPromotionFixture } from '../promotion/promotion.seed';
import { modifiedShopFixture } from '../shop/shop.seed';
import { userFixture, userFixture2 } from '../user/user.seed';

describe('Testing authorization', () => {
  // Create instances
  const factory = new TestFactory();
  let service: AuthService;
  let cardService: CardService;
  let shopService: ShopService;
  let promotionService: PromotionService;
  let balanceService: BalanceService;

  beforeAll(async () => {
    const moduleRef = await factory.configure();
    const module = await factory.init(moduleRef);
    service = module.get<AuthService>(AuthService);
    shopService = module.get<ShopService>(ShopService);
    cardService = module.get<CardService>(CardService);
    promotionService = module.get<PromotionService>(PromotionService);
    balanceService = module.get<BalanceService>(BalanceService);

    await factory.seed();
  });

  afterAll(async () => {
    await factory.close();
  });

  beforeEach(() => {
    jest
      .spyOn(shopService, 'sendToAnalytics')
      .mockResolvedValue({ status: 200, errors: null });
    jest
      .spyOn(cardService, 'sendToAnalytics')
      .mockResolvedValue({ status: 200, errors: null });
    jest
      .spyOn(promotionService, 'sendToAnalytics')
      .mockResolvedValue({ status: 200, errors: null });
    jest
      .spyOn(balanceService, 'sendToAnalytics')
      .mockResolvedValue({ status: 200, errors: null });
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
