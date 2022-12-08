import { validateOrReject } from "class-validator";
import { Request, Response } from "express";
import { PromotionCounter } from "../entities";
import {
  IPromotionCounterCreatePayload,
  IPromotionCounterUpdatePayload,
} from "../payloads";
import {
  CardRepository,
  PromotionCounterRepository,
  PromotionRepository,
} from "../repositories";

export class PromotionCounterController {
  /**
   * Get one promotion counter
   */
  static one = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      const promotionCounter = await PromotionCounterRepository.findOneById(id);
      res.status(200).send(promotionCounter);
    } catch (error) {
      res.status(404).send({ message: "Promotion not found" });
    }
  };

  /**
   * Create a promotion counter
   */
  static create = async (req: Request, res: Response) => {
    const payload: IPromotionCounterCreatePayload = <
      IPromotionCounterCreatePayload
    >req.body;

    try {
      if (payload.cardId) await CardRepository.findOneById(payload.cardId);
    } catch (error) {
      res.status(404).send({ message: "Card not found" });
      return;
    }

    try {
      if (payload.promotionId)
        await PromotionRepository.findOneById(payload.promotionId);
    } catch (error) {
      res.status(404).send({ message: "Promotion not found" });
      return;
    }

    const promotionCounter = new PromotionCounter();
    Object.assign(promotionCounter, payload);

    try {
      await validateOrReject(promotionCounter);
    } catch (errors) {
      res.status(400).send({ message: "Validation failed", errors });
      return;
    }

    try {
      await PromotionCounterRepository.save(promotionCounter);
      res.status(201).send({ message: "Promotion counter created" });
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };

  /**
   * Update a promotion counter
   */
  static update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const payload: IPromotionCounterUpdatePayload = <
      IPromotionCounterUpdatePayload
    >req.body;

    let promotionCounter: PromotionCounter;

    try {
      promotionCounter = await PromotionCounterRepository.findOneById(id);
    } catch (error) {
      res.status(404).send({ message: "Promotion counter not found" });
      return;
    }

    promotionCounter = Object.assign(promotionCounter, payload);

    try {
      await validateOrReject(promotionCounter);
    } catch (errors) {
      res.status(400).send({
        message: "Validation failed",
        errors,
      });
      return;
    }

    try {
      await PromotionCounterRepository.save(promotionCounter);
      res.status(200).send({ message: "Promotion counter updated" });
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };

  /**
   * Delete a promotion counter
   */
  static delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      await PromotionCounterRepository.findOneById(id);
    } catch (error) {
      res.status(404).send({ message: "Promotion counter not found" });
      return;
    }

    try {
      await PromotionCounterRepository.delete(id);
      res.status(200).send({ message: "Promotion counter deleted" });
    } catch (error) {
      res
        .status(400)
        .send({ message: "Error while deleting promotion counter" });
    }
  };
}
