"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const PromotionCounterRouter = (0, express_1.Router)();
// get one shop for user
PromotionCounterRouter.get("/:userId([0-9]+)/:shopId?([0-9]+)/:promotionId?([0-9]+)", controllers_1.PromotionCounterController.oneByUser);
// get one shop for client | shop
PromotionCounterRouter.get("/:shopId([0-9]+)/:userId?([0-9]+)/:promotionId?([0-9]+)", controllers_1.PromotionCounterController.oneByUser);
// create a shop
PromotionCounterRouter.post("/:shopId([0-9]+)/:userId([0-9]+)/:promotionId([0-9]+)", controllers_1.PromotionCounterController.create);
// update a shop
PromotionCounterRouter.put("/:shopId([0-9]+)/:userId([0-9]+)/:promotionId([0-9]+)", controllers_1.PromotionCounterController.update);
// delete a shop
//  will be done in the future
// PromotionCounterRouter.delete("/:id([0-9]+)", PromotionCounterController.delete);
exports.default = PromotionCounterRouter;
//# sourceMappingURL=promotion-counter.routes.js.map