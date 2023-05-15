/* eslint-disable no-undef */
import { HttpStatus } from '@nestjs/common';
import { AuthService } from '../../src/auth/auth.service';
import {
  invalidLoginRequestFixture,
  registerRequestFixture,
} from './auth.seed';
import { TestFactory } from '../factory';

describe('Testing auth controller', () => {
  // Create instances
  const factory = new TestFactory();
  let service: AuthService;

  beforeAll(async () => {
    const moduleRef = await factory.configure();
    const module = await factory.init(moduleRef);
    service = module.get<AuthService>(AuthService);
  });

  afterAll(async () => {
    await factory.close();
  });

  describe('Register()', () => {
    describe('with an empty payload', () => {
      it('responds with status 400', async () => {
        const response = await factory.post('/auth/register');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body.message.length).toBeGreaterThan(0);
      });
    });

    describe('with a correct payload', () => {
      it('responds with status 201', async () => {
        jest.spyOn(service, 'register').mockResolvedValue({
          status: HttpStatus.CREATED,
          userUuid: 'some-uuid',
          errors: null,
        });

        const response = await factory
          .post('/auth/register')
          .send(registerRequestFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(HttpStatus.CREATED);
        expect(response.body.errors).toBeUndefined;
        expect(response.body.email).toBe(registerRequestFixture.email);
        expect(response.body.uuid).toBe('some-uuid');
      });
    });
  });

  describe('Login()', () => {
    describe('with valid credentials', () => {
      it('responds with status 200', async () => {
        jest.spyOn(service, 'login').mockResolvedValue({
          status: HttpStatus.OK,
          token: 'xxxxx',
          errors: [],
        });

        const response = await factory
          .put('/auth/login')
          .send(registerRequestFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(HttpStatus.OK);
        expect(response.body.token).toBe('xxxxx');
        expect(response.body.errors.length).toBe(0);
      });
    });

    describe('with invalid credentials', () => {
      it('responds with status 200', async () => {
        jest.spyOn(service, 'login').mockResolvedValue({
          status: HttpStatus.UNAUTHORIZED,
          errors: ['Invalid password'],
        });

        const response = await factory
          .put('/auth/login')
          .send(invalidLoginRequestFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
        expect(response.body.message).toBe('Invalid password');
      });
    });
  });
});
