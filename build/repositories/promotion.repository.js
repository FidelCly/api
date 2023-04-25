"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionRepository = void 0;
const _1 = require(".");
const entities_1 = require("../entities");
class PromotionRepository {
}
exports.PromotionRepository = PromotionRepository;
_a = PromotionRepository;
/**
 * Find promotion by id
 * @param id - Id of the promotion
 * @returns A promotion if found
 */
PromotionRepository.findOneById = async (id) => {
    return await (0, _1.getDataSource)()
        .getRepository(entities_1.Promotion)
        .findOneByOrFail({
        id: Number(id)
    });
};
/**
 * Save a promotion on the db
 * @param promotion - The promotion to save
 */
PromotionRepository.save = async (promotion) => {
    await (0, _1.getDataSource)().getRepository(entities_1.Promotion).save(promotion);
};
/**
 * Delete a promotion from the db
 * @param id - The id of the promotion to delete
 */
PromotionRepository.delete = async (id) => {
    await (0, _1.getDataSource)().getRepository(entities_1.Promotion).delete(id);
};
//# sourceMappingURL=promotion.repository.js.map