"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardController = void 0;
const class_validator_1 = require("class-validator");
const entities_1 = require("../entities");
const repositories_1 = require("../repositories");
class CardController {
}
exports.CardController = CardController;
_a = CardController;
/**
 * Get one card
 */
CardController.one = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const card = await repositories_1.CardRepository.findOneById(id);
        res.status(200).send(card);
    }
    catch (error) {
        res.status(404).send({ message: "Card not found" });
    }
};
/**
 * Create a card
 */
CardController.create = async (req, res) => {
    const payload = req.body;
    try {
        /* todo: replace by current user check when authentication is implemented */
        if (payload.userId)
            await repositories_1.UserRepository.findOneById(payload.userId);
    }
    catch (error) {
        res.status(404).send({ message: "User not found" });
        return;
    }
    try {
        if (payload.shopId)
            await repositories_1.ShopRepository.findOneById(payload.shopId);
    }
    catch (error) {
        res.status(404).send({ message: "Shop not found" });
        return;
    }
    const card = new entities_1.Card();
    Object.assign(card, payload);
    card.startAt = new Date(payload.startAt);
    card.endAt = payload.endAt ? new Date(payload.endAt) : new Date();
    card.isActive = true;
    try {
        await (0, class_validator_1.validateOrReject)(card);
    }
    catch (errors) {
        res.status(400).send({ message: "Validation failed", errors });
        return;
    }
    try {
        await repositories_1.CardRepository.save(card);
        res.status(201).send({ message: "Card created" });
    }
    catch (error) {
        res.status(400).send({ message: error });
    }
};
/**
 * Update a card
 */
CardController.update = async (req, res) => {
    const id = Number(req.params.id);
    const payload = req.body;
    let card;
    try {
        card = await repositories_1.CardRepository.findOneById(id);
    }
    catch (error) {
        res.status(404).send({ message: "Card not found" });
        return;
    }
    Object.assign(card, payload);
    if (payload.startAt)
        card.startAt = new Date(payload.startAt);
    if (payload.endAt)
        card.endAt = new Date(payload.endAt);
    try {
        await (0, class_validator_1.validateOrReject)(card);
    }
    catch (errors) {
        res.status(400).send({
            message: "Validation failed",
            errors
        });
        return;
    }
    try {
        await repositories_1.CardRepository.save(card);
        res.status(200).send({ message: "Card updated" });
    }
    catch (error) {
        res.status(400).send({ message: error });
    }
};
/**
 * Delete a card
 */
CardController.delete = async (req, res) => {
    const id = Number(req.params.id);
    try {
        await repositories_1.CardRepository.findOneById(id);
    }
    catch (error) {
        res.status(404).send({ message: "Card not found" });
        return;
    }
    await repositories_1.CardRepository.delete(id);
    res.status(200).send({ message: "Card deleted" });
};
//# sourceMappingURL=card.controller.js.map