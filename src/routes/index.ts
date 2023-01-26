import { Router } from "express";
import BalanceRouter from "./balance.routes";
import CardRouter from "./card.routes";
import PromotionRouter from "./promotion.routes";
import ShopRouter from "./shop.routes";
import UserRouter from "./user.routes";

const routes = Router();

routes.use("/cards", CardRouter);
routes.use("/users", UserRouter);
routes.use("/shops", ShopRouter);
routes.use("/promotions", PromotionRouter);
routes.use("/balances", BalanceRouter);

export default routes;
