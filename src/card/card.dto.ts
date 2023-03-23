import { IsBoolean, IsDateString, IsNumber } from 'class-validator';

export class CreateCardDto {
  @IsNumber()
  readonly shopId: number;

  @IsNumber()
  readonly userId: number;

  @IsDateString()
  readonly startAt?: Date;

  @IsDateString()
  readonly endAt: Date;

  @IsBoolean()
  readonly isActive?: boolean;
}

export class UpdateCardDto {
  @IsDateString()
  readonly startAt?: Date;

  @IsDateString()
  readonly endAt?: Date;

  @IsBoolean()
  readonly isActive?: boolean;
}
