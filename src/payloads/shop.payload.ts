export interface IShopCreatePayload {
  companyName: string;
  siren: string;
  siret: string;
  email: string;
  zipCode: string;
  geoloc: string;
  phone: string;
  address: string;
}

export interface IShopUpdatePayload {
  companyName?: string;
  siren?: string;
  siret?: string;
  email?: string;
  zipCode?: string;
  geoloc?: number;
  phone?: string;
  address?: string;
}
