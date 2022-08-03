import { validateOrReject } from "class-validator";
import { Request, Response } from "express";
import { Shop } from "../entities";
import { IShopPayload } from "../payloads";
import { ShopRepository } from "../repositories";

export class ShopController {
  /**
   * Get one shop
   */
  static one = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      const shop = await ShopRepository.findOneById(id);
      res.status(200).send(shop);
    } catch (error) {
      res.status(404).send({ message: "Shop not found" });
    }
  };

  /**
   * Create a shop
   */
  static create = async (req: Request, res: Response) => {
    const payload: IShopPayload = req.body;

    let shop = new Shop();
    shop = { ...payload, ...shop };
    shop.isActive = true;

    try {
      await validateOrReject(payload);
    } catch (errors) {
      res.status(409).send({ message: "Validation failed", errors });
      return;
    }

    try {
      await ShopRepository.save(shop);
      res.status(201).send({ message: "Shop created" });
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };
}
