"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const PromotionRouter = (0, express_1.Router)();
// get one shop
PromotionRouter.get("/:id([0-9]+)", controllers_1.PromotionController.one);
// create a shop
PromotionRouter.post("/", controllers_1.PromotionController.create);
// update a shop
PromotionRouter.put("/:id([0-9]+)", controllers_1.PromotionController.update);
// delete a shop
PromotionRouter.delete("/:id([0-9]+)", controllers_1.PromotionController.delete);
exports.default = PromotionRouter;
//# sourceMappingURL=promotion.routes.js.map