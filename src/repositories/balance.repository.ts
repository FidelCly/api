import { getDataSource } from ".";
import { Balance } from "../entities";

export class BalanceRepository {
  /**
   * Find balance by id
   * @param id - Id of the balance
   * @returns A balance if found
   */
  static findOneById = async (id: number): Promise<Balance> => {
    return await getDataSource()
      .getRepository(Balance)
      .findOneByOrFail({
        id: Number(id),
      });
  };

  /**
   * Save a balance on the db
   * @param balance - The balance to save
   */
  static save = async (balance: Balance) => {
    await getDataSource().getRepository(Balance).save(balance);
  };

  /**
   * Delete a balance from the db
   * @param id - The id of the balance to delete
   */
  static delete = async (id: number) => {
    await getDataSource().getRepository(Balance).delete(id);
  };
}
