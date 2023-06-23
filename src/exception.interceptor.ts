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
            throw new BadRequestException(
              res.errors.length > 1 ? res.errors : res.errors[0],
            );
          case HttpStatus.CONFLICT:
            throw new ConflictException(
              res.errors.length > 1 ? res.errors : res.errors[0],
            );
          case HttpStatus.UNAUTHORIZED:
            throw new UnauthorizedException(
              res.errors.length > 1 ? res.errors : res.errors[0],
            );
          case HttpStatus.FORBIDDEN:
            throw new ForbiddenException(
              res.errors.length > 1 ? res.errors : res.errors[0],
            );

          default:
            return res;
        }
      }),
    );
  }
}
