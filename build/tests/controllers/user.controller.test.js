"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const factory_1 = require("../factory");
const user_seed_1 = require("../seeds/user.seed");
describe("Testing user controller", () => {
    // Create instances
    const factory = new factory_1.TestFactory();
    const testUserModified = {
        username: "testUsernameModified",
    };
    const testUserModifiedEmpty = {
        username: "",
    };
    beforeAll(async () => {
        await factory.init();
    });
    afterAll(async () => {
        await factory.close();
    });
    describe("Create user", () => {
        it("responds with status 400", async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post("/users")
                .set("Accept", "application/json");
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Validation failed");
        });
        it("responds with status 201", async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post("/users")
                .send(user_seed_1.userFixture)
                .set("Accept", "application/json");
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(201);
            expect(response.body.message).toMatch(/created/);
        });
    });
    describe("Update user", () => {
        beforeAll(async () => { });
        it("responds with status 404", async () => {
            const response = await (0, supertest_1.default)(factory.app)
                .put("/users/10")
                .set("Accept", "application/json")
                .send(testUserModified);
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toMatch(/not found/);
        });
        it("responds with status 400", async () => {
            const response = await (0, supertest_1.default)(factory.app)
                .put("/users/1")
                .set("Accept", "application/json")
                .send(testUserModifiedEmpty);
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Validation failed");
        });
        it("responds with status 200", async () => {
            const response = await (0, supertest_1.default)(factory.app)
                .put("/users/1")
                .set("Accept", "application/json")
                .send(testUserModified);
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toMatch(/updated/);
        });
    });
    describe("Get one user", () => {
        it("responds with status 404", async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .get("/users/10")
                .set("Accept", "application/json");
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toMatch(/not found/);
        });
        it("responds with status 200", async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .get("/users/1")
                .set("Accept", "application/json");
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(200);
        });
    });
    describe("Delete user", () => {
        it("responds with status 404", async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .delete("/users/10")
                .set("Accept", "application/json");
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toMatch(/not found/);
        });
        it("responds with status 200", async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .delete("/users/1")
                .set("Accept", "application/json");
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toMatch(/deleted/);
        });
    });
});
//# sourceMappingURL=user.controller.test.js.map