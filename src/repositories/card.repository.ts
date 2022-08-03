import { AppDataSource } from "../data-source";
import { Card } from "../entities";

export class CardRepository {
  static findOneById = async (id: Number): Promise<Card> => {
    return await AppDataSource.getRepository(Card).findOneByOrFail({
      id: Number(id),
    });
  };

  static save = async (card: Card) => {
    await AppDataSource.getRepository(Card).save(card);
  };

  static delete = async (id: number) => {
    await AppDataSource.getRepository(Card).delete(id);
  };
}
