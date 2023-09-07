"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers/");
const UserRouter = (0, express_1.Router)();
// get one user
UserRouter.get("/:id([0-9]+)", controllers_1.UserController.one);
// get user's wallet
UserRouter.get("/:id([0-9]+)/wallet/", controllers_1.UserController.wallet);
// create a user
UserRouter.post("/", controllers_1.UserController.create);
// update a user
UserRouter.put("/:id([0-9]+)", controllers_1.UserController.update);
// delete a user
UserRouter.delete("/:id([0-9]+)", controllers_1.UserController.delete);
exports.default = UserRouter;
//# sourceMappingURL=user.routes.js.map