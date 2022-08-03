import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const UserRouter = Router();

// get one card
UserRouter.get("/:id([0-9]+)", UserController.one);

// create a card
UserRouter.post("/", UserController.create);

export default UserRouter;
