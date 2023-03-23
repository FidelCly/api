import { IsBoolean, IsNumber } from 'class-validator';

export class CreateBalanceDto {
  @IsNumber()
  public readonly promotionId: number;

  @IsNumber()
  public readonly cardId: number;

  @IsNumber()
  public readonly counter?: number;

  @IsBoolean()
  public readonly isActive?: boolean;
}

export class UpdateBalanceDto {
  @IsNumber()
  public readonly counter?: number;

  @IsBoolean()
  public readonly isActive?: boolean;
}
