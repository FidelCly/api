"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const card_routes_1 = __importDefault(require("./card.routes"));
const shop_routes_1 = __importDefault(require("./shop.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const routes = (0, express_1.Router)();
routes.use("/cards", card_routes_1.default);
routes.use("/users", user_routes_1.default);
routes.use("/shops", shop_routes_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map