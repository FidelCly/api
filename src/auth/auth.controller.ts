import {
  Body,
  Controller,
  Inject,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { LoginResponse } from './auth.pb';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/user.dto';
import { ExceptionInterceptor } from './exception.interceptor';
import { LoginRequestDto, RegisterRequestDto } from './auth.dto';

@Controller('auth')
@UseInterceptors(ExceptionInterceptor)
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Inject(UserService)
  private readonly userService: UserService;

  @Post('register')
  private async register(@Body() body: RegisterRequestDto) {
    const { status, errors, userUuid } = await this.service.register(body);

    if (status != 201) return { status, errors };

    const newUser: CreateUserDto = {
      email: body.email,
      username: body.email.split('@')[0],
      uuid: userUuid,
    };

    return this.userService.create(newUser);
  }

  @Put('login')
  private async login(@Body() body: LoginRequestDto): Promise<LoginResponse> {
    return this.service.login(body);
  }
}
