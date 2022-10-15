import { validateOrReject } from "class-validator";
import { Request, Response } from "express";
import { Card } from "../entities";
import { ICardCreatePayload, ICardUpdatePayload } from "../payloads";
import {
  CardRepository,
  ShopRepository,
  UserRepository,
} from "../repositories";

export class CardController {
  /**
   * Get one card
   */
  static one = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      const card = await CardRepository.findOneById(id);
      res.status(200).send(card);
    } catch (error) {
      res.status(404).send({ message: "Card not found" });
    }
  };

  /**
   * Create a card
   */
  static create = async (req: Request, res: Response) => {
    const payload: ICardCreatePayload = <ICardCreatePayload>req.body;

    try {
      /* todo: replace by current user check when authentication is implemented */
      if (payload.userId) await UserRepository.findOneById(payload.userId);
    } catch (error) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    try {
      if (payload.shopId) await ShopRepository.findOneById(payload.shopId);
    } catch (error) {
      res.status(404).send({ message: "Shop not found" });
      return;
    }

    const card = new Card();
    Object.assign(card, payload);
    card.startAt = new Date(payload.startAt);
    card.endAt = payload.endAt ? new Date(payload.endAt) : new Date();
    card.isActive = true;

    try {
      await validateOrReject(card);
    } catch (errors) {
      res.status(400).send({ message: "Validation failed", errors });
      return;
    }

    try {
      await CardRepository.save(card);
      res.status(201).send({ message: "Card created" });
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };

  /**
   * Update a card
   */
  static update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const payload: ICardUpdatePayload = <ICardUpdatePayload>req.body;

    let card: Card;

    try {
      card = await CardRepository.findOneById(id);
    } catch (error) {
      res.status(404).send({ message: "Card not found" });
      return;
    }

    Object.assign(card, payload);
    if (payload.startAt) card.startAt = new Date(payload.startAt);
    if (payload.endAt) card.endAt = new Date(payload.endAt);

    try {
      await validateOrReject(card);
    } catch (errors) {
      res.status(400).send({
        message: "Validation failed",
        errors,
      });
      return;
    }

    try {
      await CardRepository.save(card);
      res.status(200).send({ message: "Card updated" });
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };

  /**
   * Delete a card
   */
  static delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      await CardRepository.findOneById(id);
    } catch (error) {
      res.status(404).send({ message: "Card not found" });
      return;
    }

    await CardRepository.delete(id);
    res.status(200).send({ message: "Card deleted" });
  };

  /**
   * Get all cards of a user
   * @param Id - The id of the user
   * @returns An array of cards
   */
  static allByUserId = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    console.log(id);
    try {
      await UserRepository.findOneById(id);
    } catch (error) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    try {
      const cards = await CardRepository.findAllByUserId(id);
      res.status(200).send(cards);
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };
}
