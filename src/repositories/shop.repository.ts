import { AppDataSource } from "../data-source";
import { Shop } from "../entities";

export interface IShopPayload {
  companyName: string;
  siren: string;
  siret: string;
  email: string;
  zipCode: string;
  geoloc: number;
  phone: string;
  address: string;
}

const shopRepository = AppDataSource.getRepository(Shop);

export const getShop = async (id: number): Promise<Shop | null> => {
  const shop = await shopRepository.findOneBy({ id: id });
  if (!shop) return null;
  return shop;
};
