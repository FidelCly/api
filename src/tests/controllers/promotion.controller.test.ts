/* eslint-disable no-undef */
import { DESTRUCTION } from "dns";
import request from "supertest";
import { writeHeapSnapshot } from "v8";
import app from "../../app";
import { TestFactory } from "../factory";
import {
  modifiedEmptyPromotionFixture,
  modifiedPromotionFixture,
  promotionFixture,
} from "../seeds/promotion.seed";

describe("Testing promotion controller", () => {
  const factory = new TestFactory();

  beforeAll(async () => {
    await factory.init();
    await factory.seedShop();
  });

  afterAll(async () => {
    await factory.close();
  });

  describe("Create promotion", () => {
    describe("with an empty payload", () => {
      it("responds with status 400", async () => {
        const response = await request(app)
          .post("/promotions")
          .set("Accept", "application/json");

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Validation failed");
      });
    });

    describe("with a correct payload", () => {
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
  });

  describe("Update promotion", () => {
    describe("of unknown id", () => {
      it("responds with status 404", async () => {
        const response = await request(factory.app)
          .put("/promotions/10")
          .set("Accept", "application/json")
          .send(modifiedPromotionFixture);

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch(/not found/);
      });
    });

    describe("with incorrect payload", () => {
      it("responds with status 400", async () => {
        const response = await request(factory.app)
          .put("/promotions/1")
          .set("Accept", "application/json");

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toMatch(/Validation failed/);
      });
    });

    describe("with a correct payload", () => {
      it("responds with status 200", async () => {
        const response = await request(factory.app)
          .put("/promotions/1")
          .set("Accept", "application/json")
          .send(modifiedEmptyPromotionFixture);

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/updated/);
      });
    });
  });

  describe("Delete promotion", () => {
    describe("of unknown id", () => {
      it("responds with status 404", async () => {
        const response = await request(factory.app)
          .delete("/promotions/10")
          .set("Accept", "application/json");

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch(/not found/);
      });
    });

    describe("of known id", () => {
      it("responds with status 200", async () => {
        const response = await request(factory.app)
          .delete("/promotions/1")
          .set("Accept", "application/json");

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/deleted/);
      });
    });
  });
});
