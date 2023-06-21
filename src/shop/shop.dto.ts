import { ShopActivity } from './shop.enum';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  Length,
} from 'class-validator';

export class CreateShopDto {
  @IsNotEmpty()
  @IsString()
  readonly companyName: string;

  @IsNotEmpty()
  @IsEnum(ShopActivity)
  readonly activity: ShopActivity;

  @IsNotEmpty()
  @IsString()
  @Length(9, 9)
  readonly siren: string;

  @IsNotEmpty()
  @IsString()
  @Length(14, 14)
  readonly siret: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsPostalCode('FR')
  @Length(5, 5)
  readonly zipCode: string;

  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsLatitude()
  readonly lat: string;

  @IsNotEmpty()
  @IsLongitude()
  readonly long: string;

  @IsNotEmpty()
  @IsPhoneNumber('FR')
  @Length(10, 10)
  readonly phone: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  readonly isActive?: boolean;
}

export class UpdateShopDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly companyName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(ShopActivity)
  readonly activity?: ShopActivity;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(9, 9)
  readonly siren?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(14, 14)
  readonly siret?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  readonly marketingEmail?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsPostalCode('FR')
  @Length(5, 5)
  readonly zipCode?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly city?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly address?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsLatitude()
  readonly lat?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsLongitude()
  readonly long?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsPhoneNumber('FR')
  @Length(10, 10)
  readonly phone?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  readonly isActive?: boolean;
}

export interface ShopFilterOptions {
  lat?: string;
  long?: string;
  distance?: string;
  isActive?: boolean;
}
