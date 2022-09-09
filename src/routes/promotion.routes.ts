import { Router } from "express";
import { PromotionController } from "../controllers";

const PromotionRouter = Router();

// get one shop
PromotionRouter.get("/:id([0-9]+)", PromotionController.one);

// create a shop
PromotionRouter.post("/", PromotionController.create);

// update a shop
PromotionRouter.put("/:id([0-9]+)", PromotionController.update);

// delete a shop
PromotionRouter.delete("/:id([0-9]+)", PromotionController.delete);

export default PromotionRouter;
