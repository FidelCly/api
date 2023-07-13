import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateIf,
} from 'class-validator';
import { SendRequest } from './campaign.pb';

export class CreateCampaignDto implements Partial<SendRequest> {
  @IsOptional()
  @IsNumber()
  readonly promotionId?: number;

  @IsNotEmpty()
  @IsString()
  readonly subject: string;

  @ValidateIf((o) => !o.htmlData && !o.templateUrl)
  @IsNotEmpty()
  @IsString()
  readonly textData?: string;

  @ValidateIf((o) => !o.textData && !o.templateUrl)
  @IsNotEmpty()
  @IsString()
  readonly htmlData?: string;

  @ValidateIf((o) => !o.textData && !o.htmlData)
  @IsNotEmpty()
  @IsUrl()
  readonly templateUrl?: string;
}

export class SendCampaignDto {
  @IsOptional()
  @IsNumber()
  readonly id?: number;

  @ValidateIf((o) => !o.id)
  @IsOptional()
  @IsNumber()
  readonly promotionId?: number;

  @ValidateIf((o) => !o.id)
  @IsNotEmpty()
  @IsString()
  readonly subject?: string;

  @ValidateIf((o) => !o.id && !o.htmlData && !o.templateUrl)
  @IsNotEmpty()
  @IsString()
  readonly textData?: string;

  @ValidateIf((o) => !o.id && !o.textData && !o.templateUrl)
  @IsNotEmpty()
  @IsString()
  readonly htmlData?: string;

  @ValidateIf((o) => !o.id && !o.htmlData && !o.textData)
  @IsNotEmpty()
  @IsUrl()
  readonly templateUrl?: string;
}

export class UpdateCampaignDto {
  @IsOptional()
  @IsNumber()
  readonly promotionId?: number;

  @IsOptional()
  @IsString()
  readonly subject?: string;

  @IsOptional()
  @IsString()
  readonly textData?: string;

  @IsOptional()
  @IsString()
  readonly htmlData?: string;

  @IsOptional()
  @IsUrl()
  readonly templateUrl?: string;
}
