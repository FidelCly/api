import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePromotionDto {
  @IsNotEmpty()
  @IsNumber()
  readonly shopId: number;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly description?: string;

  @IsNotEmpty()
  @IsNumber()
  readonly checkoutLimit: number;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  readonly startAt?: Date;

  @IsNotEmpty()
  @IsDateString()
  readonly endAt: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  readonly isActive?: boolean;
}

export class UpdatePromotionDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  readonly checkoutLimit?: number;

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
