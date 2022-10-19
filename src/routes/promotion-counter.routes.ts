import { Router } from "express";
import { PromotionCounterController } from "../controllers";

const PromotionCounterRouter = Router();

// get one shop for user
PromotionCounterRouter.get(
	"/user/:userId([0-9]+)/:shopId([0-9]+)/:promotionId([0-9]+)",
	PromotionCounterController.oneByUser
);

// get one shop for client | shop
PromotionCounterRouter.get(
	"/client/:shopId([0-9]+)/:userId?([0-9]+)/:promotionId?([0-9]+)",
	PromotionCounterController.oneByClient
);

// create a shop
PromotionCounterRouter.post("/client", PromotionCounterController.create);

// update a shop
PromotionCounterRouter.put("/client/:userId?([0-9]+)", PromotionCounterController.update);

// delete a shop
//  will be done in the future
// PromotionCounterRouter.delete("/:id([0-9]+)", PromotionCounterController.delete);

export default PromotionCounterRouter;
