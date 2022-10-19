import { Router } from "express";
import { PromotionCounterController } from "../controllers";

const PromotionCounterRouter = Router();

// get one PromotionCounter for user
PromotionCounterRouter.get(
  "/user/:userId([0-9]+)/:PromotionCounterId([0-9]+)/:promotionId([0-9]+)",
  PromotionCounterController.oneByUser
);

// get one PromotionCounter for client | PromotionCounter
PromotionCounterRouter.get(
  "/client/:PromotionCounterId([0-9]+)/:userId?([0-9]+)/:promotionId?([0-9]+)",
  PromotionCounterController.oneByUser
);

// create a PromotionCounter
PromotionCounterRouter.post("/client", PromotionCounterController.create);

// update a PromotionCounter
PromotionCounterRouter.put("/client", PromotionCounterController.update);

// delete a PromotionCounter
//  will be done in the future
// PromotionCounterRouter.delete("/:id([0-9]+)", PromotionCounterController.delete);

export default PromotionCounterRouter;
