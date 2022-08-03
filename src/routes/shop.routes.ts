import { Router } from "express";
import { ShopController } from "../controllers";

const ShopRouter = Router();

// get one card
ShopRouter.get("/:id([0-9]+)", ShopController.one);

// create a card
ShopRouter.post("/", ShopController.create);

export default ShopRouter;
