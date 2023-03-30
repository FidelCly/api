import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import {
  AuthServiceClient,
  AUTH_SERVICE_NAME,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ValidateResponse,
} from './auth.pb';

@Injectable()
export class AuthService {
  private svc: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  public async register(body: RegisterRequest): Promise<RegisterResponse> {
    return firstValueFrom(this.svc.register(body));
  }

  public async login(body: LoginRequest): Promise<LoginResponse> {
    return lastValueFrom(this.svc.login(body));
  }

  public async validate(token: string): Promise<ValidateResponse> {
    return lastValueFrom(this.svc.validate({ token }));
  }
}
