import { LoginRequest, RegisterRequest } from 'src/auth/auth.pb';

export const registerRequestFixture: RegisterRequest = {
  email: 'toto@example.com',
  password: '12345678',
};

export const invalidLoginRequestFixture: LoginRequest = {
  email: 'toto@example.com',
  password: '123456',
};
