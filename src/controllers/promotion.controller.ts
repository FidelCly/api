import { validateOrReject } from "class-validator";
import { Request, Response } from "express";
import { Promotion } from "../entities";
import { IPromotionCreatePayload, IPromotionUpdatePayload } from "../payloads";
import { PromotionRepository } from "../repositories";

export class PromotionController {
  /**
   * Get one promotion
   */
  static one = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      const promotion = await PromotionRepository.findOneById(id);
      res.status(200).send(promotion);
    } catch (error) {
      res.status(404).send({ message: "Promotion not found" });
    }
  };

  /**
   * Create promotion
   */
  static create = async (req: Request, res: Response) => {
    const payload: IPromotionCreatePayload = <IPromotionCreatePayload>req.body;

    const promotion = new Promotion();
    Object.assign(promotion, payload);

    try {
      await validateOrReject(promotion);
    } catch (errors) {
      res.status(400).send({ message: "Validation failed", errors });

      return;
    }

    try {
      await PromotionRepository.save(promotion);
      res.status(201).send({ message: "Promotion created" });
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };

  /**
   * Update promotion
   */
  static update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const payload: IPromotionUpdatePayload = <IPromotionUpdatePayload>req.body;

    let promotion: Promotion;

    try {
      promotion = await PromotionRepository.findOneById(id);
    } catch (error) {
      res.status(404).send({ message: "Promotion not found" });
      return;
    }

    promotion = Object.assign(promotion, payload);

    try {
      await validateOrReject(promotion);
    } catch (errors) {
      res.status(400).send({
        message: "Validation failed",
        errors,
      });
      return;
    }

    try {
      await PromotionRepository.save(promotion);
      res.status(200).send({ message: "Promotion updated" });
    } catch (error) {
      res.status(400).send({ message: error });
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

    await PromotionRepository.delete(id);
    res.status(200).send({ message: "Promotion deleted" });
  };
}
