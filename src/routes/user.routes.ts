import { Router } from "express";
import { UserController } from "../controllers/";

const UserRouter = Router();

// get one user
UserRouter.get("/:id([0-9]+)", UserController.one);

// create a user
UserRouter.post("/", UserController.create);

// update a user
UserRouter.put("/:id([0-9]+)", UserController.update);

// delete a user
UserRouter.delete("/:id([0-9]+)", UserController.delete);

export default UserRouter;
