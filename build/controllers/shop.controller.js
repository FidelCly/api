"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopController = void 0;
const class_validator_1 = require("class-validator");
const entities_1 = require("../entities");
const repositories_1 = require("../repositories");
class ShopController {
}
exports.ShopController = ShopController;
_a = ShopController;
/**
 * Get one shop
 */
ShopController.one = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const shop = await repositories_1.ShopRepository.findOneById(id);
        res.status(200).send(shop);
    }
    catch (error) {
        res.status(404).send({ message: "Shop not found" });
    }
};
/**
 * Create shop
 */
ShopController.create = async (req, res) => {
    const payload = req.body;
    if (payload.email) {
        const shopAlreadyExists = await repositories_1.ShopRepository.findOneByEmail(payload.email);
        if (shopAlreadyExists) {
            res.status(409).send({ message: "Email already in use" });
            return;
        }
    }
    let shop = new entities_1.Shop();
    shop = Object.assign(shop, payload);
    shop.isActive = true;
    try {
        await (0, class_validator_1.validateOrReject)(shop);
    }
    catch (errors) {
        res.status(400).send({ message: "Validation failed", errors });
        return;
    }
    try {
        await repositories_1.ShopRepository.save(shop);
        res.status(201).send({ message: "Shop created" });
    }
    catch (error) {
        res.status(400).send({ message: error });
    }
};
/**
 * Update shop
 */
ShopController.update = async (req, res) => {
    const id = Number(req.params.id);
    const payload = req.body;
    let shop;
    try {
        shop = await repositories_1.ShopRepository.findOneById(id);
    }
    catch (error) {
        res.status(404).send({ message: "Shop not found" });
        return;
    }
    if (payload.email) {
        const shopAlreadyExists = await repositories_1.ShopRepository.findOneByEmail(payload.email);
        if (shopAlreadyExists) {
            res.status(409).send({ message: "Email already in use" });
            return;
        }
    }
    shop = Object.assign(shop, payload);
    try {
        await (0, class_validator_1.validateOrReject)(shop);
    }
    catch (errors) {
        res.status(400).send({
            message: "Validation failed",
            errors,
        });
        return;
    }
    try {
        await repositories_1.ShopRepository.save(shop);
        res.status(200).send({ message: "Shop updated" });
    }
    catch (error) {
        res.status(400).send({ message: error });
    }
};
/**
 * Delete shop
 */
ShopController.delete = async (req, res) => {
    const id = Number(req.params.id);
    try {
        await repositories_1.ShopRepository.findOneById(id);
    }
    catch (error) {
        res.status(404).send({ message: "Shop not found" });
        return;
    }
    await repositories_1.ShopRepository.delete(id);
    res.status(200).send({ message: "Shop deleted" });
};
//# sourceMappingURL=shop.controller.js.map