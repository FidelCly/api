import { getDataSource } from ".";
import { Shop } from "../entities";

export class ShopRepository {
  /**
   * Find shop by id
   * @param id - Id of the shop
   * @returns A shop if found
   */
  static findOneById = async (id: number): Promise<Shop> => {
    return await getDataSource()
      .getRepository(Shop)
      .findOneByOrFail({
        id: Number(id),
      });
  };

  /**
   * Find shop by email
   * @param email - Email of the shop
   * @returns A shop if found
   */
  static findOneByEmail = async (email: string): Promise<Shop | null> => {
    return await getDataSource().getRepository(Shop).findOneBy({
      email,
    });
  };

  /**
   * Save a shop on the db
   * @param shop - The shop to save
   */
  static save = async (shop: Shop) => {
    await getDataSource().getRepository(Shop).save(shop);
  };

  /**
   * Delete a shop from the db
   * @param id - The id of the shop to delete
   */
  static delete = async (id: number) => {
    await getDataSource().getRepository(Shop).delete(id);
  };
}
