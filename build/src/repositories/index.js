"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataSource = exports.ShopRepository = exports.UserRepository = exports.CardRepository = void 0;
const data_source_1 = require("../data-source");
const test_data_source_1 = require("../test-data-source");
const card_repository_1 = require("./card.repository");
Object.defineProperty(exports, "CardRepository", { enumerable: true, get: function () { return card_repository_1.CardRepository; } });
const shop_repository_1 = require("./shop.repository");
Object.defineProperty(exports, "ShopRepository", { enumerable: true, get: function () { return shop_repository_1.ShopRepository; } });
const user_repository_1 = require("./user.repository");
Object.defineProperty(exports, "UserRepository", { enumerable: true, get: function () { return user_repository_1.UserRepository; } });
const getDataSource = () => {
    return process.env.NODE_ENV === "test" ? test_data_source_1.TestDataSource : data_source_1.AppDataSource;
};
exports.getDataSource = getDataSource;
//# sourceMappingURL=index.js.map