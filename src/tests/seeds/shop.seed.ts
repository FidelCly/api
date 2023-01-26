import { IShopCreatePayload, IShopUpdatePayload } from "../../payloads";

export const shopFixture: IShopCreatePayload = {
  companyName: "Bistrot123",
  siren: "123456789",
  siret: "12345678901234",
  email: "bistrot123@gmail.com",
  zipCode: "12345",
  geoloc: "22.366329,-10.137468",
  phone: "0632547698",
  address: "12 rue du bistrot",
};

export const modifiedShopFixture: IShopUpdatePayload = {
  companyName: "testshopnameModified",
};

export const emptyModifiedShopFixture: IShopUpdatePayload = {
  companyName: "",
};
