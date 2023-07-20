import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CheckoutDto {
  @IsNotEmpty()
  @IsString()
  readonly uuid: string;

  @IsNotEmpty()
  @IsNumber()
  readonly promotionId: number;
}
