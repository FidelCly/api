import express from "express";
import CardRouter from "./card.router";

const router = express.Router();

router.use("/wallet", CardRouter);

export default router;
