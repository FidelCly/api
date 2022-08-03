import { Router } from "express";
import CardRouter from "./card.routes";
import ShopRouter from "./shop.routes";
import UserRouter from "./user.routes";

const routes = Router();

routes.use("/wallet", CardRouter);
routes.use("/users", UserRouter);
routes.use("/shops", ShopRouter);

export default routes;
