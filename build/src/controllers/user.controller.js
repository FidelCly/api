"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const class_validator_1 = require("class-validator");
const entities_1 = require("../entities");
const repositories_1 = require("../repositories");
class UserController {
}
exports.UserController = UserController;
_a = UserController;
/**
 * Get one user
 */
UserController.one = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const user = await repositories_1.UserRepository.findOneById(id);
        res.status(200).send(user);
    }
    catch (error) {
        res.status(404).send({ message: "User not found" });
    }
};
/**
 * Create a user
 */
UserController.create = async (req, res) => {
    const payload = req.body;
    if (payload.email) {
        const userAlreadyExists = await repositories_1.UserRepository.findOneByEmail(payload.email);
        if (userAlreadyExists) {
            res.status(409).send({ message: "Email already in use" });
            return;
        }
    }
    let user = new entities_1.User();
    user = Object.assign(user, payload);
    user.isActive = true;
    try {
        await (0, class_validator_1.validateOrReject)(user);
    }
    catch (errors) {
        res.status(400).send({ message: "Validation failed", errors });
        return;
    }
    try {
        await repositories_1.UserRepository.save(user);
        res.status(201).send({ message: "User created" });
    }
    catch (error) {
        res.status(400).send({ message: error });
    }
};
/**
 * Update user
 */
UserController.update = async (req, res) => {
    const id = Number(req.params.id);
    const payload = req.body;
    let user;
    try {
        user = await repositories_1.UserRepository.findOneById(id);
    }
    catch (error) {
        res.status(404).send({ message: "User not found" });
        return;
    }
    if (payload.email) {
        const userAlreadyExists = await repositories_1.UserRepository.findOneByEmail(payload.email);
        if (userAlreadyExists) {
            res.status(409).send({ message: "Email already in use" });
            return;
        }
    }
    user = Object.assign(user, payload);
    try {
        await (0, class_validator_1.validateOrReject)(user);
    }
    catch (errors) {
        res.status(400).send({
            message: "Validation failed",
            errors,
        });
        return;
    }
    try {
        await repositories_1.UserRepository.save(user);
        res.status(200).send({ message: "User updated" });
    }
    catch (error) {
        res.status(400).send({ message: error });
    }
};
/**
 * Delete user
 */
UserController.delete = async (req, res) => {
    const id = Number(req.params.id);
    try {
        await repositories_1.UserRepository.findOneById(id);
    }
    catch (error) {
        res.status(404).send({ message: "User not found" });
        return;
    }
    await repositories_1.UserRepository.deleteUsersCards(id);
    await repositories_1.UserRepository.delete(id);
    res.status(200).send({ message: "User deleted" });
};
/**
 * Get user's wallet
 */
UserController.wallet = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const user = await repositories_1.UserRepository.getUsersCards(id);
        res.status(200).send(user.cards);
    }
    catch (error) {
        res.status(404).send({ message: "User not found" });
    }
};
//# sourceMappingURL=user.controller.js.map