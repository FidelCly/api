"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const _1 = require(".");
const entities_1 = require("../entities");
class UserRepository {
}
exports.UserRepository = UserRepository;
_a = UserRepository;
/**
 * Find user by id
 * @param id - Id of the user
 * @returns A user if found
 */
UserRepository.findOneById = async (id) => {
    return await (0, _1.getDataSource)()
        .getRepository(entities_1.User)
        .findOneByOrFail({
        id: Number(id),
    });
};
/**
 * Find user by username
 * @param username - Username of the user
 * @returns A user if found
 */
UserRepository.findOneByUsername = async (username) => {
    return await (0, _1.getDataSource)().getRepository(entities_1.User).findOneBy({
        username,
    });
};
/**
 * Find user by email
 * @param email - Email of the user
 * @returns A user if found
 */
UserRepository.findOneByEmail = async (email) => {
    return await (0, _1.getDataSource)().getRepository(entities_1.User).findOneBy({
        email,
    });
};
/**
 * Save a user on the db
 * @param user - The user to save
 */
UserRepository.save = async (user) => {
    await (0, _1.getDataSource)().getRepository(entities_1.User).save(user);
};
/**
 * Delete a user from the db
 * @param id - The id of the user to delete
 */
UserRepository.delete = async (id) => {
    await (0, _1.getDataSource)().getRepository(entities_1.User).delete(id);
};
/**
 * Get a user's cards from the db
 * @param id - The id of user
 */
UserRepository.getUsersCards = async (id) => {
    return await (0, _1.getDataSource)()
        .getRepository(entities_1.User)
        .findOneOrFail({
        where: { id },
        relations: { cards: { shop: true } },
    });
};
/**
 * Delete a user's cards from the db
 * @param id - The id of user
 */
UserRepository.deleteUsersCards = async (id) => {
    await (0, _1.getDataSource)()
        .createQueryBuilder()
        .delete()
        .from(entities_1.Card)
        .where({ userId: id })
        .execute();
};
//# sourceMappingURL=user.repository.js.map