"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionCounterRepository = void 0;
const _1 = require(".");
const promotion_counter_1 = require("../entities/promotion-counter");
class PromotionCounterRepository {
}
exports.PromotionCounterRepository = PromotionCounterRepository;
_a = PromotionCounterRepository;
/**
 * Find promotionCounter by promotionId for the user
 * @param id - Id of the promotionCounter
 * @returns A promotionCounter if found
 */
PromotionCounterRepository.findOneUser = async (userId, shopId, promotionId) => {
    return await (0, _1.getDataSource)()
        .getRepository(promotion_counter_1.PromotionCounter)
        .findOneByOrFail(userId && !promotionId && !shopId
        ? {
            userId: Number(userId)
        }
        : userId && promotionId && !shopId
            ? {
                userId: Number(userId),
                promotionId: Number(promotionId)
            }
            : {
                userId: Number(userId),
                promotionId: Number(promotionId),
                shopId: Number(shopId)
            });
};
/**
 * Find promotionCounter by promotionId for the client / shop
 * @param id - Id of the promotionCounter
 * @returns A promotionCounter if found
 */
PromotionCounterRepository.findOneShop = async (shopId, userId, promotionId) => {
    return await (0, _1.getDataSource)()
        .getRepository(promotion_counter_1.PromotionCounter)
        .findOneByOrFail(shopId && !userId && !promotionId
        ? {
            shopId: Number(shopId)
        }
        : shopId && userId && !promotionId
            ? {
                shopId: Number(shopId),
                userId: Number(userId)
            }
            : {
                shopId: Number(shopId),
                userId: Number(userId),
                promotionId: Number(promotionId)
            });
};
/**
 * Save a promotionCounter on the db
 * @param promotionCounter - The promotionCounter to save
 */
PromotionCounterRepository.save = async (promotionCounter) => {
    await (0, _1.getDataSource)().getRepository(promotion_counter_1.PromotionCounter).save(promotionCounter);
};
/**
 * Delete a promotionCounter from the db
 * @param id - The id of the promotionCounter to delete
 */
PromotionCounterRepository.delete = async (id) => {
    await (0, _1.getDataSource)().getRepository(promotion_counter_1.PromotionCounter).delete(id);
};
//# sourceMappingURL=promotion-counter.repository.js.map