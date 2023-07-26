"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const factory_1 = require("../factory");
const card_seed_1 = require("../seeds/card.seed");
describe("Testing card controller", () => {
    // Create instances
    const factory = new factory_1.TestFactory();
    const testCardModified = {
        url: "http://testModified.com",
        isActive: false,
    };
    const testCardModifiedEmpty = {
        url: "",
    };
    beforeAll(async () => {
        await factory.init();
        await factory.seedUser();
        await factory.seedShop();
    });
    afterAll(async () => {
        await factory.close();
    });
    describe("Create card", () => {
        it("responds with status 400", async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post("/cards")
                .set("Accept", "application/json");
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Validation failed");
        });
        it("responds with status 201", async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post("/cards")
                .set("Accept", "application/json")
                .send(card_seed_1.cardFixture);
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(201);
            expect(response.body.message).toMatch(/created/);
        });
    });
    describe("Update card", () => {
        it("responds with status 404", async () => {
            const response = await (0, supertest_1.default)(factory.app)
                .put("/cards/10")
                .set("Accept", "application/json")
                .send(testCardModified);
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toMatch(/not found/);
        });
        it("responds with status 400", async () => {
            const response = await (0, supertest_1.default)(factory.app)
                .put("/cards/1")
                .set("Accept", "application/json")
                .send(testCardModifiedEmpty);
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Validation failed");
        });
        it("responds with status 200", async () => {
            const response = await (0, supertest_1.default)(factory.app)
                .put("/cards/1")
                .set("Accept", "application/json")
                .send(testCardModified);
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toMatch(/updated/);
        });
    });
    describe("Get one card", () => {
        it("responds with status 404", async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .get("/cards/10")
                .set("Accept", "application/json");
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toMatch(/not found/);
        });
        it("responds with status 200", async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .get("/cards/1")
                .set("Accept", "application/json");
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(200);
        });
    });
    describe("Delete card", () => {
        it("responds with status 404", async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .delete("/cards/10")
                .set("Accept", "application/json");
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toMatch(/not found/);
        });
        it("responds with status 200", async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .delete("/cards/1")
                .set("Accept", "application/json");
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toMatch(/deleted/);
        });
    });
});
//# sourceMappingURL=card.controller.test.js.map