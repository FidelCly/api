import { ShopActivity } from "../entities";

export interface IShopCreatePayload {
  companyName: string;
  activity: ShopActivity;
  siren: string;
  siret: string;
  email: string;
  zipCode: string;
  city: string;
  address: string;
  lat: string;
  long: string;
  phone: string;
}

export interface IShopUpdatePayload {
  companyName?: string;
  activity?: ShopActivity;
  siren?: string;
  siret?: string;
  email?: string;
  zipCode?: string;
  lat?: string;
  long?: string;
  phone?: string;
  address?: string;
  city?: string;
}
