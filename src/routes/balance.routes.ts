import { Router } from "express";
import { BalanceController } from "../controllers";

const BalanceRouter = Router();

// get one balance
BalanceRouter.get("/:id([0-9]+)", BalanceController.one);

// create a balance
BalanceRouter.post("/", BalanceController.create);

// update a balance
BalanceRouter.put("/:id([0-9]+)", BalanceController.update);

// delete a balance
BalanceRouter.delete("/:id([0-9]+)", BalanceController.delete);

// checkout
BalanceRouter.put("/checkout/:id([0-9]+)", BalanceController.checkout);

export default BalanceRouter;
