"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionCounterController = void 0;
const class_validator_1 = require("class-validator");
const entities_1 = require("../entities");
const repositories_1 = require("../repositories");
const type_promotion_1 = require("../shared/enums/type-promotion");
class PromotionCounterController {
}
exports.PromotionCounterController = PromotionCounterController;
_a = PromotionCounterController;
/**
 * Get one promotion by promotion id for user
 */
PromotionCounterController.oneByUser = async (req, res) => {
    const shopId = Number(req.params.shopId);
    const userId = Number(req.params.userId);
    const promotionId = Number(req.params.promotionId);
    try {
        const promotion = await repositories_1.PromotionCounterRepository.findOneUser(userId, shopId, promotionId);
        res.status(200).send(promotion);
    }
    catch (error) {
        res.status(404).send({ message: "Promotion not found" });
    }
};
/**
 * Get one promotion by promotion id for user
 */
PromotionCounterController.oneByClient = async (req, res) => {
    const shopId = Number(req.params.shopId);
    const userId = Number(req.params.userId);
    const promotionId = Number(req.params.promotionId);
    try {
        const promotion = await repositories_1.PromotionCounterRepository.findOneUser(userId, shopId, promotionId);
        res.status(200).send(promotion);
    }
    catch (error) {
        res.status(404).send({ message: "Promotion not found" });
    }
};
/**
 * Create promotion
 */
PromotionCounterController.create = async (req, res) => {
    const payload = req.body;
    let promotion = new entities_1.Promotion();
    promotion = Object.assign(promotion, payload);
    promotion.isActive = true;
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
 * Update promotion counter
 */
PromotionCounterController.update = async (req, res) => {
    try {
        const promotionId = Number(req.params.id);
        const shopId = Number(req.params.shopId);
        const userId = Number(req.params.userId);
        const [promotion, promotionCounter] = await Promise.all([
            repositories_1.PromotionRepository.findOneById(promotionId),
            repositories_1.PromotionCounterRepository.findOneShop(shopId, userId, promotionId)
        ]);
        if (!promotion)
            res.status(400).send({ message: `promotion with id '${promotionId}' not found` });
        if (!promotionCounter)
            res.status(400).send({ message: `promotionCounter with id '${promotionId}' not found` });
        console.log("🚀 ~ PromotionCounterController ~ update= ~ promotionCounter", promotionCounter);
        console.log("🚀 ~ PromotionCounterController ~ update= ~ promotion", promotion);
        if (promotion.type === type_promotion_1.TypePromotion.AMOUNT) {
            if (promotionCounter.increment < promotion.limitAmout) {
                promotionCounter.increment += 1;
                if (promotionCounter.increment === promotion.limitAmout) {
                    promotionCounter.increment = 0;
                    promotionCounter.nbValidation += 1;
                    res.status(200).send({ message: "Promotion validated" });
                }
                res.status(200).send({ message: "Promotion incremented" });
            }
            else {
                res.status(400).send({ message: "Promotion not incremented" });
            }
        }
        else if (promotion.type === type_promotion_1.TypePromotion.PASSAGE) {
            if (promotionCounter.increment < promotion.limitPassage) {
                promotionCounter.increment += 1;
                if (promotionCounter.increment === promotion.limitAmout) {
                    promotionCounter.increment = 0;
                    promotionCounter.nbValidation += 1;
                    res.status(200).send({ message: "Promotion validated" });
                }
                res.status(200).send({ message: "Promotion incremented" });
            }
            else {
                res.status(400).send({ message: "Promotion not incremented" });
            }
        }
        else {
            // TODO: implement percentage
            res.status(200).send({ message: "Promotion percentage not implemented yet" });
        }
        await (0, class_validator_1.validateOrReject)(promotionCounter);
        await repositories_1.PromotionCounterRepository.save(promotionCounter);
    }
    catch (error) {
        res.status(404).send({ message: "Error while updating promotion counter : ", error });
    }
};
/**
 * Delete promotion
 */
PromotionCounterController.delete = async (req, res) => {
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
//# sourceMappingURL=promotion-counter.controller.js.map