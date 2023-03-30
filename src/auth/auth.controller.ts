import {
  Body,
  Controller,
  Inject,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
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

  @Inject(UserService)
  private userService: UserService;

  @Post('register')
  private async register(
    @Body() body: RegisterRequest,
  ): Promise<RegisterResponse | User> {
    const res = await this.svc.register(body);
    if (res.status != 201) return res;

    const createUserDto = {
      ...new CreateUserDto(),
      ...body,
      username: body.email.split('@')[0],
    };
    return this.userService.create(createUserDto);
  }

  @Put('login')
  private async login(@Body() body: LoginRequest): Promise<LoginResponse> {
    return this.svc.login(body);
  }
}
