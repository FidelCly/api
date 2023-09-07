import { LoginRequestDto, RegisterRequestDto } from '../../src/auth/auth.dto';
import { Role } from '../../src/user/user.enum';

export const registerRequestFixture: RegisterRequestDto = {
  email: 'toto@example.com',
  password: '12345678',
  role: Role.User,
};

export const invalidLoginRequestFixture: LoginRequestDto = {
  email: 'toto@example.com',
  password: '123456',
};
