"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardRepository = void 0;
const _1 = require(".");
const entities_1 = require("../entities");
class CardRepository {
}
exports.CardRepository = CardRepository;
_a = CardRepository;
/**
 * Find card by id
 * @param id - Id of the card
 * @returns A card if found
 */
CardRepository.findOneById = async (id) => {
    return await (0, _1.getDataSource)()
        .getRepository(entities_1.Card)
        .findOneByOrFail({
        id: Number(id),
    });
};
/**
 * Save a card on the db
 * @param card - The card to save
 */
CardRepository.save = async (card) => {
    await (0, _1.getDataSource)().getRepository(entities_1.Card).save(card);
};
/**
 * Delete a card from the db
 * @param id - The id of the card to delete
 */
CardRepository.delete = async (id) => {
    await (0, _1.getDataSource)().getRepository(entities_1.Card).delete(id);
};
//# sourceMappingURL=card.repository.js.map