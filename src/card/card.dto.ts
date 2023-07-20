import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsNumber()
  readonly shopId: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  readonly userId?: number;

  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;
}

export class UpdateCardDto {
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  readonly isActive?: boolean;
}
