import { Router } from "express";
import { CardController } from "../controllers/card.controller";

const CardRouter = Router();

// get one card
CardRouter.get("/:id([0-9]+)", CardController.one);

// create a card
CardRouter.post("/", CardController.create);

// update a card
CardRouter.put("/:id([0-9]+)", CardController.update);

// delete a card
CardRouter.delete("/:id([0-9]+)", CardController.delete);

export default CardRouter;
