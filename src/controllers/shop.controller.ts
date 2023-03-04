import { validateOrReject } from "class-validator";
import { Request, Response } from "express";
import { Shop } from "../entities";
import { IShopCreatePayload, IShopUpdatePayload } from "../payloads";
import { ShopRepository } from "../repositories";
import { getDistance } from "../utils/geoloc.utils";

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
   * Get all shops
   */
  static all = async (req: Request, res: Response) => {
    const lat = Number(req.query.lat);
    const long = Number(req.query.long);
    const distance = Number(req.query.d);
    const active = Boolean(req.query.active);

    let shops = await ShopRepository.all();

    // Return active shops only
    if (active) {
      shops = shops.filter((shop: Shop) => {
        return shop.isActive === true;
      });
    }

    // Return shops located in defined area
    if (distance && lat && long) {
      shops = shops.filter((shop: Shop) => {
        return (
          getDistance(Number(shop.lat), Number(shop.long), lat, long) < distance
        );
      });
    }

    res.status(200).send(shops);
  };

  /**
   * Create shop
   */
  static create = async (req: Request, res: Response) => {
    const payload: IShopCreatePayload = <IShopCreatePayload>req.body;

    if (payload.email) {
      const shopAlreadyExists = await ShopRepository.findOneByEmail(
        payload.email
      );

      if (shopAlreadyExists) {
        res.status(409).send({ message: "Email already in use" });
        return;
      }
    }

    let shop = new Shop();
    shop = Object.assign(shop, payload);
    shop.isActive = true;

    try {
      await validateOrReject(shop);
    } catch (errors) {
      res.status(400).send({ message: "Validation failed", errors });
      return;
    }

    try {
      await ShopRepository.save(shop);
      res.status(201).send({ message: "Shop created" });
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };

  /**
   * Update shop
   */
  static update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const payload: IShopUpdatePayload = <IShopUpdatePayload>req.body;

    let shop: Shop;

    try {
      shop = await ShopRepository.findOneById(id);
    } catch (error) {
      res.status(404).send({ message: "Shop not found" });
      return;
    }

    if (payload.email) {
      const shopAlreadyExists = await ShopRepository.findOneByEmail(
        payload.email
      );

      if (shopAlreadyExists) {
        res.status(409).send({ message: "Email already in use" });
        return;
      }
    }

    shop = Object.assign(shop, payload);

    try {
      await validateOrReject(shop);
    } catch (errors) {
      res.status(400).send({
        message: "Validation failed",
        errors,
      });
      return;
    }

    try {
      await ShopRepository.save(shop);
      res.status(200).send({ message: "Shop updated" });
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };

  /**
   * Delete shop
   */
  static delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      await ShopRepository.findOneById(id);
    } catch (error) {
      res.status(404).send({ message: "Shop not found" });
      return;
    }

    await ShopRepository.deleteShopsCards(id);

    await ShopRepository.delete(id);
    res.status(200).send({ message: "Shop deleted" });
  };

  /**
   * Get shop's promotions
   */
  static promotions = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      const shop = await ShopRepository.getShopsPromotions(id);
      res.status(200).send(shop.promotions);
    } catch (error) {
      res.status(404).send({ message: "Shop not found" });
    }
  };

  /**
   * Get shop's promotions
   */
  static clients = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      const shop = await ShopRepository.getShopsClients(id);
      res.status(200).send(shop.cards);
    } catch (error) {
      res.status(404).send({ message: "Shop not found" });
    }
  };
}
