import { Router } from "express";
import CardRouter from "./card.routes";
import PromotionCounterRouter from "./promotion-counter.routes";
import PromotionRouter from "./promotion.routes";
import ShopRouter from "./shop.routes";
import UserRouter from "./user.routes";

const routes = Router();

routes.use("/cards", CardRouter);
routes.use("/users", UserRouter);
routes.use("/shops", ShopRouter);
routes.use("/promotions", PromotionRouter);
routes.use("/promotions-counter", PromotionCounterRouter);

export default routes;
