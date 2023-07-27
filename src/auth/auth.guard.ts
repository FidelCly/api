import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '../user/user.service';
import { ValidateResponse } from './auth.pb';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(AuthService)
  public readonly service: AuthService;

  @Inject(UserService)
  public readonly userService: UserService;

  public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
    const req: Request = ctx.switchToHttp().getRequest();
    const authorization: string = req.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const bearer: string[] = authorization.split(' ');

    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException();
    }

    const token: string = bearer[1];

    const { status, userUuid, role }: ValidateResponse =
      await this.service.validate(token);

    if (status !== HttpStatus.OK) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findByUuid(userUuid);
    req['currentUser'] = { ...user, role: role };

    return true;
  }
}
