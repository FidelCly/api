import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((res) => {
        switch (res.status) {
          case HttpStatus.BAD_REQUEST:
            throw new BadRequestException(res.errors);
          case HttpStatus.CONFLICT:
            throw new ConflictException(res.errors);
          case HttpStatus.UNAUTHORIZED:
            throw new UnauthorizedException(res.errors);
          case HttpStatus.FORBIDDEN:
            throw new ForbiddenException(res.errors);

          default:
            return res;
        }
      }),
    );
  }
}
