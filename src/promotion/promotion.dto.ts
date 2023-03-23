import { IsBoolean, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreatePromotionDto {
  @IsNumber()
  private readonly shopId: number;

  @IsString()
  private readonly name: string;

  @IsString()
  private readonly description?: string;

  @IsNumber()
  private readonly checkoutLimit: number;

  @IsDateString()
  private readonly startAt?: Date;

  @IsDateString()
  private readonly endAt: Date;

  @IsBoolean()
  private readonly isActive?: boolean;
}

export class UpdatePromotionDto {
  @IsString()
  private readonly name?: string;

  @IsString()
  private readonly description?: string;

  @IsNumber()
  private readonly checkoutLimit?: number;

  @IsDateString()
  private readonly startAt?: Date;

  @IsDateString()
  private readonly endAt?: Date;

  @IsBoolean()
  private readonly isActive?: boolean;
}
