import { Router } from "express";
import { ShopController } from "../controllers";

const ShopRouter = Router();

// get one shop
ShopRouter.get("/:id([0-9]+)", ShopController.one);

// create a shop
ShopRouter.post("/", ShopController.create);

// update a shop
ShopRouter.put("/:id([0-9]+)", ShopController.update);

// delete a shop
ShopRouter.delete("/:id([0-9]+)", ShopController.delete);

export default ShopRouter;
