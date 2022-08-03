import { AppDataSource } from "../data-source";
import { Shop } from "../entities";

export class ShopRepository {
  static findOneById = async (id: Number): Promise<Shop> => {
    return await AppDataSource.getRepository(Shop).findOneByOrFail({
      id: Number(id),
    });
  };

  static create = async (shop: Shop) => {
    await AppDataSource.getRepository(Shop).save(shop);
  };

  static delete = async (id: number) => {
    await AppDataSource.getRepository(Shop).delete(id);
  };
}
