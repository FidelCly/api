import { IsDateString, IsNotEmpty } from 'class-validator';

export class AnalyticsOptions {
  @IsNotEmpty()
  @IsDateString()
  readonly start_date: string;

  @IsNotEmpty()
  @IsDateString()
  readonly end_date: string;
}
