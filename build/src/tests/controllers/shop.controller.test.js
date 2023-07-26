"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const factory_1 = require("../factory");
const shop_seed_1 = require("../seeds/shop.seed");
describe("Testing shop controller", () => {
    // Create instances
    const factory = new factory_1.TestFactory();
    const testshopModified = {
        companyName: "testshopnameModified",
    };
    const testshopModifiedEmpty = {
        companyName: "",
    };
    beforeAll(async () => {
        await factory.init();
    });
    afterAll(async () => {
        await factory.close();
    });
    describe("Create shop", () => {
        it("responds with status 400", async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post("/shops")
                .set("Accept", "application/json");
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Validation failed");
        });
        it("responds with status 201", async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post("/shops")
                .send(shop_seed_1.shopFixture)
                .set("Accept", "application/json");
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(201);
            expect(response.body.message).toMatch(/created/);
        });
    });
    describe("Update shop", () => {
        it("responds with status 404", async () => {
            const response = await (0, supertest_1.default)(factory.app)
                .put("/shops/10")
                .set("Accept", "application/json")
                .send(testshopModified);
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toMatch(/not found/);
        });
        it("responds with status 400", async () => {
            const response = await (0, supertest_1.default)(factory.app)
                .put("/shops/1")
                .set("Accept", "application/json")
                .send(testshopModifiedEmpty);
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Validation failed");
        });
        it("responds with status 200", async () => {
            const response = await (0, supertest_1.default)(factory.app)
                .put("/shops/1")
                .set("Accept", "application/json")
                .send(testshopModified);
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toMatch(/updated/);
        });
    });
    describe("Get one shop", () => {
        it("responds with status 404", async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .get("/shops/10")
                .set("Accept", "application/json");
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toMatch(/not found/);
        });
        it("responds with status 200", async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .get("/shops/1")
                .set("Accept", "application/json");
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(200);
        });
    });
    describe("Get all shops", () => {
        it("responds with status 200", async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .get("/shops/")
                .set("Accept", "application/json");
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(200);
        });
    });
    describe("Delete shop", () => {
        it("responds with status 404", async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .delete("/shops/10")
                .set("Accept", "application/json");
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toMatch(/not found/);
        });
        it("responds with status 200", async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .delete("/shops/1")
                .set("Accept", "application/json");
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toMatch(/deleted/);
        });
    });
});
//# sourceMappingURL=shop.controller.test.js.map