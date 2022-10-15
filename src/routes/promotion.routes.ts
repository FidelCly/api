import { Router } from "express";
import { PromotionController } from "../controllers";

const PromotionRouter = Router();

// get one Promotion
PromotionRouter.get("/:id([0-9]+)", PromotionController.one);

// create a Promotion
PromotionRouter.post("/", PromotionController.create);

// update a Promotion
PromotionRouter.put("/:id([0-9]+)", PromotionController.update);

// delete a Promotion
PromotionRouter.delete("/:id([0-9]+)", PromotionController.delete);

export default PromotionRouter;
