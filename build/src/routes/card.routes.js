"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const CardRouter = (0, express_1.Router)();
// get one card
CardRouter.get("/:id([0-9]+)", controllers_1.CardController.one);
// create a card
CardRouter.post("/", controllers_1.CardController.create);
// update a card
CardRouter.put("/:id([0-9]+)", controllers_1.CardController.update);
// delete a card
CardRouter.delete("/:id([0-9]+)", controllers_1.CardController.delete);
exports.default = CardRouter;
//# sourceMappingURL=card.routes.js.map