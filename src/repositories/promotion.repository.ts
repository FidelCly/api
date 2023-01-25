import { getDataSource } from ".";
import { Promotion } from "../entities";

export class PromotionRepository {
  /**
   * Find promotion by id
   * @param id - Id of the promotion
   * @returns A promotion if found
   */
  static findOneById = async (id: number): Promise<Promotion> => {
    return getDataSource()
      .getRepository(Promotion)
      .findOneByOrFail({
        id: Number(id),
      });
  };

  /**
   * Save a promotion on the db
   * @param promotion - The promotion to save
   */
  static save = async (promotion: Promotion) => {
    getDataSource().getRepository(Promotion).save(promotion);
  };

  /**
   * Delete a promotion from the db
   * @param id - The id of the promotion to delete
   */
  static delete = async (id: number) => {
    getDataSource().getRepository(Promotion).delete(id);
  };
}
