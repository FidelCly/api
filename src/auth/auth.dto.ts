import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { LoginRequest, RegisterRequest } from './auth.pb';

export class RegisterRequestDto implements RegisterRequest {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  //   @IsStrongPassword()
  readonly password: string;
}

export class LoginRequestDto implements LoginRequest {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
