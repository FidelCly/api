import { Router } from "express";
import { ShopController } from "../controllers";

const ShopRouter = Router();

// get all shops
ShopRouter.get("/", ShopController.all);

// get one shop
ShopRouter.get("/:id([0-9]+)", ShopController.one);

// get shop's promotions
ShopRouter.get("/:id([0-9]+)/promotions/", ShopController.promotions);

// create a shop
ShopRouter.post("/", ShopController.create);

// update a shop
ShopRouter.put("/:id([0-9]+)", ShopController.update);

// delete a shop
ShopRouter.delete("/:id([0-9]+)", ShopController.delete);

export default ShopRouter;
