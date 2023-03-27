import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsNumber()
  readonly shopId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  readonly startAt?: Date;

  @IsNotEmpty()
  @IsDateString()
  readonly endAt: Date;

  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;
}

export class UpdateCardDto {
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  readonly startAt?: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  readonly endAt?: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  readonly isActive?: boolean;
}
