"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopRepository = void 0;
const _1 = require(".");
const entities_1 = require("../entities");
class ShopRepository {
}
exports.ShopRepository = ShopRepository;
_a = ShopRepository;
/**
 * Find shop by id
 * @param id - Id of the shop
 * @returns A shop if found
 */
ShopRepository.findOneById = async (id) => {
    return await (0, _1.getDataSource)()
        .getRepository(entities_1.Shop)
        .findOneByOrFail({
        id: Number(id),
    });
};
/**
 * Find shop by email
 * @param email - Email of the shop
 * @returns A shop if found
 */
ShopRepository.findOneByEmail = async (email) => {
    return await (0, _1.getDataSource)().getRepository(entities_1.Shop).findOneBy({
        email,
    });
};
/**
 * Save a shop on the db
 * @param shop - The shop to save
 */
ShopRepository.save = async (shop) => {
    await (0, _1.getDataSource)().getRepository(entities_1.Shop).save(shop);
};
/**
 * Delete a shop from the db
 * @param id - The id of the shop to delete
 */
ShopRepository.delete = async (id) => {
    await (0, _1.getDataSource)().getRepository(entities_1.Shop).delete(id);
};
//# sourceMappingURL=shop.repository.js.map