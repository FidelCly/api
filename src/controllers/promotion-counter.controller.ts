import { validateOrReject } from "class-validator";
import { Request, Response } from "express";
import { PromotionCounter } from "../entities/promotion-counter";
import { IPromotionCounterUpdatePayload } from "../payloads";
import {
  PromotionCounterRepository,
  PromotionRepository,
  UserRepository,
} from "../repositories";
import { TypePromotion } from "../enums/promotion-type";

export class PromotionCounterController {
  /**
   * Get one promotion by promotion id for user
   */
  static oneByUser = async (req: Request, res: Response) => {
    const shopId = Number(req.params.shopId);
    const userId = Number(req.params.userId);
    const promotionId = Number(req.params.promotionId);

    try {
      const promotion = await PromotionCounterRepository.findOneUser(
        userId,
        shopId,
        promotionId
      );
      res.status(200).send(promotion);
    } catch (error) {
      res.status(404).send({ message: "Promotion not found" });
    }
  };

  /**
   * Get one promotion by promotion id for user
   */
  static oneByClient = async (req: Request, res: Response) => {
    const shopId = Number(req.params.shopId);
    const userId = Number(req.params.userId);
    const promotionId = Number(req.params.promotionId);

    try {
      const promotion = await PromotionCounterRepository.findOneUser(
        shopId,
        userId,
        promotionId
      );
      res.status(200).send(promotion);
    } catch (error) {
      res.status(404).send({ message: "Promotion not found" });
    }
  };

  /**
   * Create promotion counter
   */
  static create = async (req: Request, res: Response) => {
    const promotionCounter = new PromotionCounter();

    try {
      const promotionId = Number(req.body.id);
      const shopId = Number(req.body.shopId);
      const userId = Number(req.body.userId);

      const [user, promotion, promotionCounter] = await Promise.all([
        UserRepository.findOneById(userId),
        PromotionRepository.findOneById(promotionId),
        PromotionCounterRepository.findOneShop(shopId, userId, promotionId),
      ]);

      if (!promotion)
        res
          .status(400)
          .send({ message: `promotion with id '${promotionId}' not found` });

      if (!user)
        res.status(400).send({ message: `user with id '${userId}' not found` });

      if (!promotionCounter)
        res.status(400).send({
          message: `promotionCounter with id '${promotionId}' not found`,
        });

      promotionCounter.shopId = Number(req.body.shopId);
      promotionCounter.userId = Number(req.body.userId);
      promotionCounter.promotionId = Number(req.body.promotionId);
      promotionCounter.increment = 0;
      promotionCounter.isActive = true;
      promotionCounter.nbValidation = 0;

      await validateOrReject(promotionCounter);
    } catch (errors) {
      res.status(400).send({ message: "Validation failed", errors });
      return;
    }

    try {
      await PromotionCounterRepository.save(promotionCounter);
      res.status(201).send({ message: "Promotion created" });
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };

  /**
   * Update promotion counter
   */
  static update = async (req: Request, res: Response) => {
    const payload: IPromotionCounterUpdatePayload = Object.assign(
      {},
      req.body as IPromotionCounterUpdatePayload
    );

    if (Object.keys(payload).length === 0)
      res.status(400).send({ message: "Validation failed" });

    try {
      const promotionId = Number(req.body.id);
      const shopId = Number(req.body.shopId);
      const userId = Number(req.params.userId);

      const [user, promotion, promotionCounter] = await Promise.all([
        UserRepository.findOneById(userId),
        PromotionRepository.findOneById(promotionId),
        PromotionCounterRepository.findOneShop(shopId, userId, promotionId),
      ]);

      if (!promotion)
        res
          .status(400)
          .send({ message: `promotion with id '${promotionId}' not found` });

      if (!user)
        res.status(400).send({ message: `user with id '${userId}' not found` });

      if (!promotionCounter)
        res.status(400).send({
          message: `promotionCounter with id '${promotionId}' not found`,
        });

      if (promotion.type === TypePromotion.AMOUNT) {
        if (promotionCounter.increment < promotion.limitAmout) {
          promotionCounter.increment += 1;
          if (promotionCounter.increment === promotion.limitAmout) {
            promotionCounter.increment = 0;
            promotionCounter.nbValidation += 1;
            res.status(200).send({ message: "Promotion validated" });
          }
          res.status(200).send({ message: "Promotion incremented" });
        } else {
          res.status(400).send({ message: "Promotion not incremented" });
        }
      } else if (promotion.type === TypePromotion.PASSAGE) {
        if (promotionCounter.increment < promotion.limitPassage) {
          promotionCounter.increment += 1;
          if (promotionCounter.increment === promotion.limitAmout) {
            promotionCounter.increment = 0;
            promotionCounter.nbValidation += 1;
            res.status(200).send({ message: "Promotion validated" });
          }
          res.status(200).send({ message: "Promotion incremented" });
        } else {
          res.status(400).send({ message: "Promotion not incremented" });
        }
      } else {
        // TODO: implement percentage
        res
          .status(200)
          .send({ message: "Promotion percentage not implemented yet" });
      }
      await validateOrReject(promotionCounter);
      await PromotionCounterRepository.save(promotionCounter);
    } catch (error) {
      res
        .status(404)
        .send({ message: "Error while updating promotion counter : ", error });
    }
  };

  /**
   * Delete promotion
   */
  static delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      await PromotionRepository.findOneById(id);
    } catch (error) {
      res.status(404).send({ message: "Promotion not found" });
      return;
    }

    try {
      await PromotionRepository.delete(id);
      res.status(200).send({ message: "Promotion deleted" });
    } catch (error) {
      res
        .status(400)
        .send({ message: "Error while deleting promotion counter" });
    }
  };
}
