import { AppDataSource } from "../data-source";
import { Card } from "../entities";

export interface ICardPayload {
  url: string;
  shopId: number;
  userId: number;
  startAt: Date;
  endAt: Date;
}

const cardRepository = AppDataSource.getRepository(Card);

export const createCard = async (payload: ICardPayload): Promise<Card> => {
  const card = new Card();
  card.isActive = true;

  return cardRepository.save({
    ...card,
    ...payload,
  });
};

export const getCard = async (id: number): Promise<Card | null> => {
  const card = await cardRepository.findOneBy({ id: id });
  if (!card) return null;
  return card;
};

export const updateCard = async (
  id: number,
  payload: ICardPayload
): Promise<Card | null> => {
  const card = await cardRepository.findOneBy({ id: id });
  if (!card) return null;

  return cardRepository.save({
    ...card,
    ...payload,
  });
};

export const deleteCard = async (id: number): Promise<Card | null> => {
  const card = await cardRepository.findOneBy({ id: id });
  if (!card) return null;
  cardRepository.delete(id);
  return card;
};
