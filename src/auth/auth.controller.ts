import {
  Body,
  Controller,
  Inject,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { RegisterRequestDto } from './auth.dto';
import { RegisterResponse, LoginResponse, LoginRequest } from './auth.pb';
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
    @Body() body: RegisterRequestDto,
  ): Promise<RegisterResponse> {
    return this.svc.register(body);
  }

  // @Post('register')
  // private async register(@Body() registerRequestDto: RegisterRequestDto) {
  //   const { status, errors, userUuid }: RegisterResponse =
  //     await this.svc.register(registerRequestDto);
  //   console.log(status, errors, userUuid);
  //   if (status != 201) return { status, errors };

  //   const createUserDto = {
  //     ...new CreateUserDto(),
  //     ...registerRequestDto,
  //     uuid: userUuid,
  //     username: registerRequestDto.email.split('@')[0],
  //   };

  //   return this.userService.create(createUserDto);
  // }

  @Put('login')
  private async login(
    @Body() loginRequestDto: LoginRequest,
  ): Promise<LoginResponse> {
    return this.svc.login(loginRequestDto);
  }
}
