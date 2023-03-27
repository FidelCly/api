/* eslint-disable no-undef */
import * as request from 'supertest';
import {
  HttpServer,
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import {
  invalidLoginRequestFixture,
  registerRequestFixture,
} from './auth.seed';
import { AuthModule } from '../../src/auth/auth.module';

describe('Testing auth controller', () => {
  // Create instances
  let app: INestApplication;
  let server: HttpServer;
  let service: AuthService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
            validate: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    service = moduleRef.get<AuthService>(AuthService);
    await app.init();

    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Register()', () => {
    describe('with an empty payload', () => {
      it('responds with status 400', async () => {
        jest.spyOn(service, 'register').mockResolvedValue({
          status: HttpStatus.BAD_REQUEST,
          errors: ['bad request'],
        });

        const response = await request(server)
          .post('/auth/register')
          .set('Accept', 'application/json');

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
        expect(response.body.message).toMatchObject(['bad request']);
      });
    });

    describe('with a correct payload', () => {
      it('responds with status 201', async () => {
        jest.spyOn(service, 'register').mockResolvedValue({
          status: HttpStatus.OK,
          errors: [],
        });

        const response = await request(server)
          .post('/auth/register')
          .set('Accept', 'application/json')
          .send(registerRequestFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(HttpStatus.CREATED);
        expect(response.body.errors.length).toBe(0);
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

        const response = await request(server)
          .put('/auth/login')
          .set('Accept', 'application/json')
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

        const response = await request(server)
          .put('/auth/login')
          .set('Accept', 'application/json')
          .send(invalidLoginRequestFixture);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
        expect(response.body.message).toMatchObject(['Invalid password']);
      });
    });
  });
});
