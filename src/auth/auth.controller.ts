import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  OnModuleInit,
  Post,
  Put,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  AuthServiceClient,
  RegisterResponse,
  RegisterRequest,
  AUTH_SERVICE_NAME,
  LoginRequest,
  LoginResponse,
} from './auth.pb';

@Controller('auth')
export class AuthController implements OnModuleInit {
  private svc: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post('register')
  private async register(@Body() body: RegisterRequest) {
    const { status, errors }: RegisterResponse = await firstValueFrom(
      this.svc.register(body),
    );

    if (status != HttpStatus.OK) throw new HttpException(errors, status);
    return { message: 'Account created' };
  }

  @Put('login')
  private async login(@Body() body: LoginRequest) {
    const { status, errors, token }: LoginResponse = await firstValueFrom(
      this.svc.login(body),
    );

    if (status != HttpStatus.OK) throw new HttpException(errors, status);
    return { message: 'Login successful', token };
  }
}
