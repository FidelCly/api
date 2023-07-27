import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Sexe } from './user.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsUUID()
  readonly uuid: string;

  @IsOptional()
  @IsString()
  pictureUrl?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly username?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  pictureUrl?: string;

  @IsOptional()
  @IsEnum(Sexe)
  readonly sexe?: Sexe;

  @IsOptional()
  @IsDateString()
  readonly birthday?: Date;

  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;
}
