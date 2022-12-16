import { Router } from "express";
import { PromotionController } from "../controllers";

const PromotionRouter = Router();

// get one promotion
PromotionRouter.get("/:id([0-9]+)", PromotionController.one);

// create a promotion
PromotionRouter.post("/", PromotionController.create);

// update a promotion
PromotionRouter.put("/:id([0-9]+)", PromotionController.update);

// delete a promotion
PromotionRouter.delete("/:id([0-9]+)", PromotionController.delete);

export default PromotionRouter;
