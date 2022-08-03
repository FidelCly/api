import { Router } from "express";
import CardRouter from "./card.router";
import ShopRouter from "./shop.routes";
import UserRouter from "./user.routes";

const routes = Router();

routes.use("/wallet", CardRouter);
routes.use("/users", UserRouter);
routes.use("/shops", ShopRouter);

export default routes;
