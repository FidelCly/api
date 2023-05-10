import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { LoginRequest, RegisterRequest } from './auth.pb';
import { Role } from '../user/user.enum';

export class RegisterRequestDto implements RegisterRequest {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  readonly role: Role;
}

export class LoginRequestDto implements LoginRequest {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
