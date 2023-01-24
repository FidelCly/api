import { validateOrReject } from "class-validator";
import { Request, Response } from "express";
import { Balance, Promotion } from "../entities";
import { IBalanceCreatePayload, IBalanceUpdatePayload } from "../payloads";
import {
  BalanceRepository,
  CardRepository,
  PromotionRepository,
} from "../repositories";

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

    const balance = new Balance();
    Object.assign(balance, payload);
    balance.counter = payload.counter ?? 0;

    try {
      await validateOrReject(balance);
    } catch (errors) {
      res.status(400).send({ message: "Validation failed", errors });
      return;
    }

    let promotion: Promotion;

    try {
      promotion = await PromotionRepository.findOneById(payload.promotionId);
    } catch (error) {
      res.status(404).send({ message: "Promotion not found" });
      return;
    }

    try {
      if (payload.cardId) await CardRepository.findOneById(payload.cardId);
    } catch (error) {
      res.status(404).send({ message: "Card not found" });
      return;
    }

    if (!promotion.isActive) {
      res.status(403).send({ message: "Promotion is not active" });
      return;
    }

    if (new Date(promotion.endAt).getTime() < new Date().getTime()) {
      promotion.isActive = false;
      await PromotionRepository.save(promotion);
      res.status(403).send({ message: "Promotion has expired" });
      return;
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
    let promotion: Promotion;

    try {
      balance = await BalanceRepository.findOneById(id);
    } catch (error) {
      res.status(404).send({ message: "Balance not found" });
      return;
    }

    try {
      promotion = await PromotionRepository.findOneById(balance.promotionId);
    } catch (error) {
      res.status(404).send({ message: "Promotion not found" });
      return;
    }

    if (!promotion.isActive) {
      res.status(403).send({ message: "Promotion is not active" });
      return;
    }

    if (new Date(promotion.endAt).getTime() < new Date().getTime()) {
      promotion.isActive = false;
      await PromotionRepository.save(promotion);
      res.status(403).send({ message: "Promotion has expired" });
      return;
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

  /**
   * Checkout a balance
   */
  static checkout = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    let balance: Balance;
    let promotion: Promotion;

    try {
      balance = await BalanceRepository.findOneById(id);
    } catch (error) {
      res.status(404).send({ message: "Balance not found" });
      return;
    }

    try {
      promotion = await PromotionRepository.findOneById(balance.promotionId);
    } catch (error) {
      res.status(404).send({ message: "Promotion not found" });
      return;
    }

    if (!promotion.isActive) {
      balance.isActive = false;
      await BalanceRepository.save(balance);
      res.status(403).send({ message: "Promotion is not active" });
      return;
    }

    if (new Date(promotion.endAt).getTime() < new Date().getTime()) {
      promotion.isActive = false;
      await PromotionRepository.save(promotion);
      res.status(403).send({ message: "Promotion has expired" });
      return;
    }

    if (balance.counter === promotion.checkoutLimit) {
      balance.counter = 1;
      balance.isActive = true;
      await BalanceRepository.save(balance);
      res.status(200).send({ message: "Balance updated" });
      return;
    }

    if (balance.counter++ === promotion.checkoutLimit) {
      balance.counter = promotion.checkoutLimit;
      balance.isActive = false;
      await BalanceRepository.save(balance);
      res.status(200).send({ message: "Promotion limit reached" });
    }

    balance.counter++;
    await BalanceRepository.save(balance);
    res.status(200).send({ message: "Balance updated" });
  };
}
