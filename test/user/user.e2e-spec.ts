import { HttpStatus } from '@nestjs/common';
import { AbilityFactory } from '../../src/auth/ability.factory';
import { AuthService } from '../../src/auth/auth.service';
import { Role } from '../../src/user/user.enum';
import { AbilityFactoryMock } from '../ability.mock';
import { cardFixture } from '../card/card.seed';
import { TestFactory } from '../factory';
import {
  emptyModifiedUserFixture,
  modifiedUserFixture,
  userFixture,
  userFixture2,
} from './user.seed';

describe('UsersController', () => {
  // Create instances
  const factory: TestFactory = new TestFactory();
  let service: AuthService;

  beforeAll(async () => {
    const moduleRef = await factory.configure();
    moduleRef.overrideProvider(AbilityFactory).useClass(AbilityFactoryMock);
    const module = await factory.init(moduleRef);
    service = module.get<AuthService>(AuthService);

    await factory.seedUser();
  });

  afterAll(async () => {
    await factory.close();
  });

  beforeEach(() => {
    jest.spyOn(service, 'validate').mockResolvedValue({
      status: HttpStatus.OK,
      userUuid: userFixture.uuid,
      role: Role.User,
      errors: null,
    });
  });

  describe('Update user', () => {
    describe('of unknown id', () => {
      it('responds with status 404', async () => {
        const response = await factory
          .put('/user/10')
          .send(modifiedUserFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('with incorrect payload', () => {
      it('responds with status 400', async () => {
        const response = await factory
          .put('/user/1')
          .send(emptyModifiedUserFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(400);
      });
    });

    describe('with a correct payload', () => {
      it('responds with status 200', async () => {
        const response = await factory.put('/user/1').send(modifiedUserFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/updated/);
      });
    });
  });

  describe('Get one user', () => {
    describe('of unknown uuid', () => {
      it('responds with status 404', async () => {
        const response = await factory.get('/user/some-unknown-uuid');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('of known uuid', () => {
      it('responds with status 200', async () => {
        const response = await factory.get('/user/some-uuid');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe("Get user's cards", () => {
    describe('of known uuid', () => {
      it('responds with status 200', async () => {
        await factory.seedUser(userFixture2);
        await factory.seedShop(null, 2);
        await factory.seedCard(cardFixture);

        const response = await factory.get('/user/cards');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(1);
      });
    });
  });

  describe('Delete user', () => {
    describe('of unknown id', () => {
      it('responds with status 404', async () => {
        const response = await factory.delete('/user/10');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch('Not Found');
      });
    });

    describe('of known id', () => {
      it('responds with status 200', async () => {
        const response = await factory.delete('/user/1');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/deleted/);
      });
    });
  });
});
