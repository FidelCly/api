import { Router } from "express";
import { PromotionCounterController } from "../controllers";

const PromotionCounterRouter = Router();

// get one promotion counter
PromotionCounterRouter.get("/:id([0-9]+)", PromotionCounterController.one);

// create a promotion counter
PromotionCounterRouter.post("/", PromotionCounterController.create);

// update a promotion counter
PromotionCounterRouter.put("/:id([0-9]+)", PromotionCounterController.update);

// delete a promotion counter
PromotionCounterRouter.delete(
  "/:id([0-9]+)",
  PromotionCounterController.delete
);

export default PromotionCounterRouter;
