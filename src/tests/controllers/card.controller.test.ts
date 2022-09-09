/* eslint-disable no-undef */
import request from "supertest";
import app from "../../app";
import { TestFactory } from "../factory";
import { cardFixture } from "../seeds/card.seed";

describe("Testing card controller", () => {
  // Create instances
  const factory = new TestFactory();

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
      const response = await request(app)
        .post("/wallet")
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("Validation failed");
    });

    it("responds with status 201", async () => {
      const response = await request(app)
        .post("/wallet")
        .set("Accept", "application/json")
        .send(cardFixture);

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toMatch(/created/);
    });
  });

  describe("Update card", () => {
    it("responds with status 404", async () => {
      const response = await request(factory.app)
        .put("/wallet/10")
        .set("Accept", "application/json")
        .send(testCardModified);

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toMatch(/not found/);
    });

    it("responds with status 400", async () => {
      const response = await request(factory.app)
        .put("/wallet/1")
        .set("Accept", "application/json")
        .send(testCardModifiedEmpty);

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("Validation failed");
    });

    it("responds with status 200", async () => {
      const response = await request(factory.app)
        .put("/wallet/1")
        .set("Accept", "application/json")
        .send(testCardModified);

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toMatch(/updated/);
    });
  });

  describe("Get one card", () => {
    it("responds with status 404", async () => {
      const response = await request(app)
        .get("/wallet/10")
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toMatch(/not found/);
    });

    it("responds with status 200", async () => {
      const response = await request(app)
        .get("/wallet/1")
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Delete card", () => {
    it("responds with status 404", async () => {
      const response = await request(app)
        .delete("/wallet/10")
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toMatch(/not found/);
    });

    it("responds with status 200", async () => {
      const response = await request(app)
        .delete("/wallet/1")
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toMatch(/deleted/);
    });
  });
});
