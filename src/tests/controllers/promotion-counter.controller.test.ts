/* eslint-disable no-undef */
import request from "supertest";
import app from "../../app";
import { TestFactory } from "../factory";
import {
  modifiedPromotionCounterFixture,
  promotionCounterFixture,
} from "../seeds/promotion-counter.seed";

describe("Testing promotion counter controller", () => {
  const factory = new TestFactory();

  beforeAll(async () => {
    await factory.init();
    await factory.seed();
  });

  afterAll(async () => {
    await factory.close();
  });

  describe("Create promotion counter", () => {
    describe("with empty payload", () => {
      it("responds with status 400", async () => {
        const response = await request(app)
          .post("/promotion-counters/")
          .set("Accept", "application/json");

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Validation failed");
      });
    });

    describe("with correct paylaod", () => {
      it("responds with status 201", async () => {
        const response = await request(app)
          .post("/promotion-counters/")
          .set("Accept", "application/json")
          .send(promotionCounterFixture);

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toMatch(/created/);
      });
    });
  });

  describe("Update promotion counter", () => {
    describe("of unknown id", () => {
      it("responds with status 404", async () => {
        const response = await request(factory.app)
          .put("/promotion-counters/10")
          .set("Accept", "application/json")
          .send(modifiedPromotionCounterFixture);

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch(/not found/);
      });
    });

    describe("of known id", () => {
      it("responds with status 200", async () => {
        const response = await request(factory.app)
          .put("/promotions-counter/1")
          .set("Accept", "application/json")
          .send(modifiedPromotionCounterFixture);

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/updated/);
      });
    });
  });

  describe("Delete promotion counter", () => {
    describe("of unknown id", () => {
      it("responds with status 404", async () => {
        const response = await request(factory.app)
          .delete("/promotion-counters/10")
          .set("Accept", "application/json");

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch(/not found/);
      });
    });

    describe("of known id", () => {
      it("responds with status 200", async () => {
        const response = await request(factory.app)
          .delete("/promotion-counters/1")
          .set("Accept", "application/json");

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/deleted/);
      });
    });
  });
});
