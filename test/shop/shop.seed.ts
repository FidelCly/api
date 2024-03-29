import { CreateShopDto, UpdateShopDto } from '../../src/shop/shop.dto';
import { ShopActivity } from '../../src/shop/shop.enum';

export const shopFixture: CreateShopDto = {
  companyName: 'Bistrot123',
  activity: ShopActivity.Restauration,
  siren: '123456789',
  siret: '12345678901234',
  email: 'bistrot123@gmail.com',
  zipCode: '12345',
  city: 'Paris',
  lat: '48.8578461',
  long: '2.3685758',
  phone: '0632547698',
  address: '12 rue du bistrot',
};

export const farAwayShopFixture: CreateShopDto = {
  companyName: 'Coffeeshop',
  activity: ShopActivity.Restauration,
  siren: '123456789',
  siret: '12345678901234',
  email: 'Coffeeshop@gmail.com',
  zipCode: '75004',
  city: 'Paris',
  lat: '48.8565266',
  long: '2.271439',
  phone: '0632547698',
  address: '51 Rue Berger',
};

export const modifiedShopFixture: UpdateShopDto = {
  companyName: 'testshopnameModified',
};

export const emptyModifiedShopFixture: UpdateShopDto = {
  companyName: '',
};
