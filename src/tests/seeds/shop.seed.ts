import { IShopCreatePayload, IShopUpdatePayload } from "../../payloads";

export const shopFixture: IShopCreatePayload = {
  companyName: "Bistrot123",
  siren: "123456789",
  siret: "12345678901234",
  email: "bistrot123@gmail.com",
  zipCode: "12345",
  lat: "48.8578461",
  long: "2.3685758",
  phone: "0632547698",
  address: "12 rue du bistrot",
};

export const farAwayShopFixture: IShopCreatePayload = {
  companyName: "Coffeeshop",
  siren: "123456789",
  siret: "12345678901234",
  email: "Coffeeshop@gmail.com",
  zipCode: "75004",
  lat: "48.8565266",
  long: "2.271439",
  phone: "0632547698",
  address: "51 Rue Berger",
};

export const modifiedShopFixture: IShopUpdatePayload = {
  companyName: "testshopnameModified",
};

export const emptyModifiedShopFixture: IShopUpdatePayload = {
  companyName: "",
};
