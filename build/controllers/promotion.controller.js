"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionController = void 0;
const class_validator_1 = require("class-validator");
const entities_1 = require("../entities");
const repositories_1 = require("../repositories");
class PromotionController {
}
exports.PromotionController = PromotionController;
_a = PromotionController;
/**
 * Get one promotion
 */
PromotionController.one = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const promotion = await repositories_1.PromotionRepository.findOneById(id);
        res.status(200).send(promotion);
    }
    catch (error) {
        res.status(404).send({ message: "Promotion not found" });
    }
};
/**
 * Create promotion
 */
PromotionController.create = async (req, res) => {
    const payload = req.body;
    console.log("🚀 ~ PromotionController ~ create= ~ payload", payload);
    let promotion = new entities_1.Promotion();
    promotion = Object.assign(promotion, payload);
    try {
        await (0, class_validator_1.validateOrReject)(promotion);
    }
    catch (errors) {
        res.status(400).send({ message: "Validation failed", errors });
        return;
    }
    try {
        await repositories_1.PromotionRepository.save(promotion);
        res.status(201).send({ message: "Promotion created" });
    }
    catch (error) {
        res.status(400).send({ message: error });
    }
};
/**
 * Update promotion
 */
PromotionController.update = async (req, res) => {
    const id = Number(req.params.id);
    const payload = req.body;
    let promotion;
    try {
        promotion = await repositories_1.PromotionRepository.findOneById(id);
    }
    catch (error) {
        res.status(404).send({ message: "Promotion not found" });
        return;
    }
    promotion = Object.assign(promotion, payload);
    try {
        await (0, class_validator_1.validateOrReject)(promotion);
    }
    catch (errors) {
        res.status(400).send({
            message: "Validation failed",
            errors
        });
        return;
    }
    try {
        await repositories_1.PromotionRepository.save(promotion);
        res.status(200).send({ message: "Promotion updated" });
    }
    catch (error) {
        res.status(400).send({ message: error });
    }
};
/**
 * Delete promotion
 */
PromotionController.delete = async (req, res) => {
    const id = Number(req.params.id);
    try {
        await repositories_1.PromotionRepository.findOneById(id);
    }
    catch (error) {
        res.status(404).send({ message: "Promotion not found" });
        return;
    }
    await repositories_1.PromotionRepository.delete(id);
    res.status(200).send({ message: "Promotion deleted" });
};
//# sourceMappingURL=promotion.controller.js.map