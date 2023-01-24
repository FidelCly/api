/* eslint-disable no-undef */
import request from "supertest";
import app from "../../app";
import { TestFactory } from "../factory";
import { modifiedBalanceFixture, balanceFixture } from "../seeds/";

describe("Testing balance controller", () => {
  const factory = new TestFactory();

  beforeAll(async () => {
    await factory.init();
    await factory.seedShop();
    await factory.seedUser();
    await factory.seedCard();
    await factory.seedPromotion();
  });

  afterAll(async () => {
    await factory.close();
  });

  describe("Create balance", () => {
    describe("with an empty payload", () => {
      it("responds with status 400", async () => {
        const response = await request(app)
          .post("/balances")
          .set("Accept", "application/json");

        expect(response.statusCode).toBe(400);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body.message).toBe("Validation failed");
      });
    });

    describe("with a correct payload", () => {
      it("responds with status 201", async () => {
        const response = await request(app)
          .post("/balances")
          .set("Accept", "application/json")
          .send(balanceFixture);

        expect(response.statusCode).toBe(201);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body.message).toMatch(/created/);
      });
    });
  });

  describe("Update balance", () => {
    describe("of unknown id", () => {
      it("responds with status 404", async () => {
        const response = await request(factory.app)
          .put("/balances/10")
          .set("Accept", "application/json")
          .send(modifiedBalanceFixture);

        expect(response.statusCode).toBe(404);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body.message).toMatch(/not found/);
      });
    });

    describe("with a correct payload", () => {
      it("responds with status 200", async () => {
        const response = await request(factory.app)
          .put("/balances/1")
          .set("Accept", "application/json")
          .send(modifiedBalanceFixture);

        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body.message).toMatch(/updated/);
      });
    });
  });

  describe("Checkout balance", () => {
    describe("of unknown id", () => {
      it("responds with status 404", async () => {
        const response = await request(factory.app)
          .put("/balances/checkout/10")
          .set("Accept", "application/json");

        expect(response.statusCode).toBe(404);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body.message).toMatch(/not found/);
      });
    });

    describe("of known id", () => {
      it("responds with status 200", async () => {
        const response = await request(factory.app)
          .put("/balances/checkout/1")
          .set("Accept", "application/json");

        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body.message).toMatch(/updated/);
      });
    });
  });

  describe("Delete balance", () => {
    describe("of unknown id", () => {
      it("responds with status 404", async () => {
        const response = await request(factory.app)
          .delete("/balances/10")
          .set("Accept", "application/json");

        expect(response.statusCode).toBe(404);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body.message).toMatch(/not found/);
      });
    });

    describe("of known id", () => {
      it("responds with status 200", async () => {
        const response = await request(factory.app)
          .delete("/balances/1")
          .set("Accept", "application/json");

        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body.message).toMatch(/deleted/);
      });
    });
  });
});
