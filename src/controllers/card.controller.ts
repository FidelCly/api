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
  static create = async (req: Request, res: Response) => {
    const payload: ICardCreatePayload = <ICardCreatePayload>req.body;
    payload.startAt = new Date(payload.startAt);
    payload.endAt = new Date(payload.endAt);

    try {
      // todo: replace by current user check when authentication is implemented
      await UserRepository.findOneById(payload.userId);
    } catch (error) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    try {
      await ShopRepository.findOneById(payload.shopId);
    } catch (error) {
      res.status(404).send({ message: "Shop not found" });
      return;
    }

    let card = new Card();
    card = { ...card, ...payload };
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

  static one = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);

    try {
      const card = await CardRepository.findOneById(id);
      res.status(200).send(card);
    } catch (error) {
      res.status(404).send({ message: "Card not found" });
    }
  };

  static update = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);

    const payload: ICardUpdatePayload = <ICardUpdatePayload>req.body;
    payload.startAt = new Date(payload.startAt);
    payload.endAt = new Date(payload.endAt);

    let card: Card;

    try {
      card = await CardRepository.findOneById(id);
    } catch (error) {
      res.status(404).send({ message: "Card not found" });
      return;
    }

    card = { ...card, ...payload };

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

  static delete = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);

    try {
      const card = await CardRepository.findOneById(id);
      res.status(200).send(card);
    } catch (error) {
      res.status(404).send({ message: "Card not found" });
      return;
    }

    await CardRepository.delete(id);
    res.status(200).send({ message: "Card deleted" });
  };
}
