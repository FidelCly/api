/* eslint-disable no-undef */
import request from "supertest";
import app from "../../app";
import { TestFactory } from "../factory";
import { promotionCounterFixture } from "../seeds/promotion-counter.seed";

describe("Testing promotion counter controller", () => {
  const factory = new TestFactory();

  const testPromotionCounterModified = {
    increment: 2,
    nbValidation: 20,
  };

  beforeAll(async () => {
    await factory.init();
    await factory.seedUser();
    await factory.seedShop();
  });

  afterAll(async () => {
    await factory.close();
  });

  describe("Create promotion counter", () => {
    it("responds with status 400", async () => {
      const response = await request(app)
        .post("/promotions-counter/client")
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("Validation failed");
    });

    it("responds with status 201", async () => {
      const response = await request(app)
        .post("/promotions-counter/client")
        .set("Accept", "application/json")
        .send(promotionCounterFixture);

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toMatch(/created/);
    });
  });

  describe("Update promotion counter", () => {
    it("responds with status 404", async () => {
      const response = await request(factory.app)
        .put("/promotions-counter/client")
        .set("Accept", "application/json")
        .send(testPromotionCounterModified);

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toMatch(/not found/);
    });

    it("responds with status 200", async () => {
      const response = await request(factory.app)
        .put("/promotions-counter/client")
        .set("Accept", "application/json")
        .send(testPromotionCounterModified);

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toMatch(/updated/);
    });
  });
});
