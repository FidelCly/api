"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestFactory = void 0;
require("reflect-metadata");
const dotenv_1 = require("dotenv");
const app_1 = __importDefault(require("../app"));
const path_1 = __importDefault(require("path"));
const entities_1 = require("../entities");
const repositories_1 = require("../repositories");
const user_seed_1 = require("./seeds/user.seed");
const shop_seed_1 = require("./seeds/shop.seed");
const card_seed_1 = require("./seeds/card.seed");
const test_data_source_1 = require("../test-data-source");
class TestFactory {
    get app() {
        return this._app;
    }
    get dataSource() {
        return this._dataSource;
    }
    /**
     * Connect to DB and start server
     */
    async init() {
        process.env.NODE_ENV = "test";
        (0, dotenv_1.config)({ path: path_1.default.join(__dirname, "../.env.test") });
        this._dataSource = await test_data_source_1.TestDataSource.initialize();
        this._app = app_1.default;
    }
    /**
     * Close server and DB connection
     */
    async close() {
        await this._dataSource.dropDatabase();
        await this._dataSource.destroy();
    }
    /**
     * Seed db
     */
    async seed() {
        this.seedUser();
        this.seedShop();
        this.seedCard();
    }
    /**
     * Seed user
     */
    async seedUser() {
        const user = new entities_1.User();
        Object.assign(user, user_seed_1.userFixture);
        await repositories_1.UserRepository.save(user);
    }
    /**
     * Seed shop
     */
    async seedShop() {
        const shop = new entities_1.Shop();
        Object.assign(shop, shop_seed_1.shopFixture);
        await repositories_1.ShopRepository.save(shop);
    }
    /**
     * Seed card
     */
    async seedCard() {
        const card = new entities_1.Card();
        Object.assign(card, card_seed_1.cardFixture);
        card.startAt = new Date(card_seed_1.cardFixture.startAt);
        card.endAt = new Date(card_seed_1.cardFixture.endAt);
        await repositories_1.CardRepository.save(card);
    }
}
exports.TestFactory = TestFactory;
//# sourceMappingURL=factory.js.map