/* eslint-disable no-undef */
import request from "supertest";
import app from "../../app";
import { TestFactory } from "../factory";
import { promotionFixture } from "../seeds/promotion.seed";

describe("Testing promotion controller", () => {
  const factory = new TestFactory();

  const testPromotionModified = {
    name: "testModified",
    description: "testModified",
    limitAmout: 10,
    limitPassage: 10,
    isActive: false,
  };

  const testPromotionModifiedEmpty = {
    name: "",
    description: "",
    type: 1,
    limitAmout: 10,
    limitPassage: 10,
    isActive: false,
  };

  beforeAll(async () => {
    await factory.init();
    await factory.seedUser();
    await factory.seedShop();
  });

  afterAll(async () => {
    await factory.close();
  });

  describe("Create promotion", () => {
    it("responds with status 400", async () => {
      const response = await request(app)
        .post("/promotions")
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("Validation failed");
    });

    it("responds with status 201", async () => {
      const response = await request(app)
        .post("/promotions")
        .set("Accept", "application/json")
        .send(promotionFixture);

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toMatch(/created/);
    });
  });

  describe("Update promotion", () => {
    it("responds with status 404", async () => {
      const response = await request(factory.app)
        .put("/promotions/1")
        .set("Accept", "application/json")
        .send(testPromotionModified);

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toMatch(/not found/);
    });

    it("responds with status 400", async () => {
      const response = await request(factory.app)
        .put("/promotions/1")
        .set("Accept", "application/json")
        .send(testPromotionModifiedEmpty);

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toMatch(/Validation failed/);
    });

    it("responds with status 200", async () => {
      const response = await request(factory.app)
        .put("/promotions/1")
        .set("Accept", "application/json")
        .send(testPromotionModified);

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toMatch(/updated/);
    });
  });

  describe("Delete promotion", () => {
    it("responds with status 404", async () => {
      const response = await request(factory.app)
        .delete("/promotions/1")
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toMatch(/not found/);
    });
  });
});
