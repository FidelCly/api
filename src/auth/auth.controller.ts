import {
  Body,
  Controller,
  Inject,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import {
  RegisterRequest,
  LoginRequest,
  RegisterResponse,
  LoginResponse,
} from './auth.pb';
import { AuthService } from './auth.service';
import { ExceptionInterceptor } from './exception.interceptor';

@Controller('auth')
@UseInterceptors(new ExceptionInterceptor())
export class AuthController {
  @Inject(AuthService)
  private svc: AuthService;

  @Post('register')
  private async register(
    @Body() body: RegisterRequest,
  ): Promise<RegisterResponse> {
    return this.svc.register(body);
  }

  @Put('login')
  private async login(@Body() body: LoginRequest): Promise<LoginResponse> {
    return this.svc.login(body);
  }
}
