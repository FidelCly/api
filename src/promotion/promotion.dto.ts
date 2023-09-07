import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreatePromotionDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly description?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
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
  @Min(1)
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
