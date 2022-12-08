import { getDataSource } from ".";
import { PromotionCounter } from "../entities/promotion-counter";

export class PromotionCounterRepository {
  /**
   * Find promotion counter by id
   * @param id - Id of the promotion counter
   * @returns A promotion counter if found
   */
  static findOneById = async (id: number): Promise<PromotionCounter> => {
    return await getDataSource()
      .getRepository(PromotionCounter)
      .findOneByOrFail({
        id: Number(id),
      });
  };

  /**
   * Save a promotion counter on the db
   * @param promotionCounter - The promotion counter to save
   */
  static save = async (promotionCounter: PromotionCounter) => {
    await getDataSource()
      .getRepository(PromotionCounter)
      .save(promotionCounter);
  };

  /**
   * Delete a promotionCounter from the db
   * @param id - The id of the promotionCounter to delete
   */
  static delete = async (id: number) => {
    await getDataSource().getRepository(PromotionCounter).delete(id);
  };
}
