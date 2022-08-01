import express from "express";
import CardController from "../controllers/card.controller";

const router = express.Router();
const controller = new CardController();

router.post("/", async (req, res) => {
  const response = await controller.createCard(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const response = await controller.getCard(req.params.id);
  if (!response) res.status(404).send({ message: "No card found" });
  return res.send(response);
});

router.put("/:id", async (req, res) => {
  const response = await controller.updateCard(req.params.id, req.body);
  if (!response) res.status(404).send({ message: "No card found" });
  return res.send(response);
});

router.delete("/:id", async (req, res) => {
  const response = await controller.deleteCard(req.params.id);
  if (!response) res.status(404).send({ message: "No card found" });
  return res.send(response);
});

export default router;
