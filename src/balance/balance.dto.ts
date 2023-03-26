import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateBalanceDto {
  @IsNotEmpty()
  @IsNumber()
  readonly promotionId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly cardId: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  readonly counter?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  readonly isActive?: boolean;
}

export class UpdateBalanceDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  readonly counter?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  readonly isActive?: boolean;
}
