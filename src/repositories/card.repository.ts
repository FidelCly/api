import { AppDataSource } from "../data-source";
import { Card } from "../entities";

export class CardRepository {
  /**
   * Find card by id
   * @param id - Id of the card
   * @returns A card if found
   */
  static findOneById = async (id: number): Promise<Card> => {
    return await AppDataSource.getRepository(Card).findOneByOrFail({
      id: Number(id),
    });
  };

  /**
   * Save a card on the db
   * @param card - The card to save
   */
  static save = async (card: Card) => {
    await AppDataSource.getRepository(Card).save(card);
  };

  /**
   * Delete a card from the db
   * @param id - The id of the card to delete
   */
  static delete = async (id: number) => {
    await AppDataSource.getRepository(Card).delete(id);
  };
}
