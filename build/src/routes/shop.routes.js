"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const ShopRouter = (0, express_1.Router)();
// get all shops
ShopRouter.get("/", controllers_1.ShopController.all);
// get one shop
ShopRouter.get("/:id([0-9]+)", controllers_1.ShopController.one);
// create a shop
ShopRouter.post("/", controllers_1.ShopController.create);
// update a shop
ShopRouter.put("/:id([0-9]+)", controllers_1.ShopController.update);
// delete a shop
ShopRouter.delete("/:id([0-9]+)", controllers_1.ShopController.delete);
exports.default = ShopRouter;
//# sourceMappingURL=shop.routes.js.map