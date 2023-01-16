import { validateOrReject } from "class-validator";
import { Request, Response } from "express";
import { Balance, Promotion } from "../entities";
import { IBalanceCreatePayload, IBalanceUpdatePayload } from "../payloads";
import { BalanceRepository, PromotionRepository } from "../repositories";

export class BalanceController {
  /**
   * Get one balance
   */
  static one = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      const balance = await BalanceRepository.findOneById(id);
      res.status(200).send(balance);
    } catch (error) {
      res.status(404).send({ message: "Balance not found" });
    }
  };

  /**
   * Create a balance
   */
  static create = async (req: Request, res: Response) => {
    const payload: IBalanceCreatePayload = <IBalanceCreatePayload>req.body;

    let promotion: Promotion;

    try {
      promotion = await PromotionRepository.findOneById(payload.promotionId);
    } catch (error) {
      res.status(404).send({ message: "Promotion not found" });
      return;
    }

    const balance = new Balance();
    Object.assign(balance, payload);

    try {
      await validateOrReject(balance);
    } catch (errors) {
      res.status(400).send({ message: "Validation failed", errors });
      return;
    }

    if (!promotion.isActive)
      res.status(404).send({ message: "Promotion is not active" });

    if (new Date(promotion.endAt).getTime() < new Date().getTime()) {
      promotion.isActive = false;
      await PromotionRepository.save(promotion);
      res.status(404).send({ message: "Promotion has expired" });
    }

    try {
      await BalanceRepository.save(balance);
      res.status(201).send({ message: "Balance created" });
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };

  /**
   * Update a balance
   */
  static update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const payload: IBalanceUpdatePayload = <IBalanceUpdatePayload>req.body;
    let balance: Balance;

    try {
      balance = await BalanceRepository.findOneById(id);
    } catch (error) {
      res.status(404).send({ message: "Balance not found" });
      return;
    }

    if (!balance.promotion.isActive)
      res.status(404).send({ message: "Promotion is not active" });

    if (new Date(balance.promotion.endAt).getTime() < new Date().getTime()) {
      balance.promotion.isActive = false;
      await PromotionRepository.save(balance.promotion);
      res.status(404).send({ message: "Promotion has expired" });
    }

    balance = Object.assign(balance, payload);

    try {
      await validateOrReject(balance);
    } catch (errors) {
      res.status(400).send({
        message: "Validation failed",
        errors,
      });
      return;
    }

    try {
      await BalanceRepository.save(balance);
      res.status(200).send({ message: "Balance updated" });
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };

  /**
   * Delete a balance
   */
  static delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      await BalanceRepository.findOneById(id);
    } catch (error) {
      res.status(404).send({ message: "Balance not found" });
      return;
    }

    await BalanceRepository.delete(id);
    res.status(200).send({ message: "Balance deleted" });
  };
}
