/* eslint-disable no-undef */
import request from "supertest";
import app from "../../app";
import { TestFactory } from "../factory";
import {
  cardFixture,
  emptyModifiedCardFixture,
  modifiedCardFixture,
} from "../seeds";

describe("Testing card controller", () => {
  // Create instances
  const factory = new TestFactory();

  beforeAll(async () => {
    await factory.init();
    await factory.seedUser();
    await factory.seedShop();
  });

  afterAll(async () => {
    await factory.close();
  });

  describe("Create card", () => {
    describe("with an empty payload", () => {
      it("responds with status 400", async () => {
        const response = await request(app)
          .post("/cards")
          .set("Accept", "application/json");

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Validation failed");
      });
    });

    describe("with a correct payload", () => {
      it("responds with status 201", async () => {
        const response = await request(app)
          .post("/cards")
          .set("Accept", "application/json")
          .send(cardFixture);

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toMatch(/created/);
      });
    });
  });

  describe("Update card", () => {
    describe("of unknown id", () => {
      it("responds with status 404", async () => {
        const response = await request(factory.app)
          .put("/cards/10")
          .set("Accept", "application/json")
          .send(modifiedCardFixture);

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch(/not found/);
      });
    });

    describe("with incorrect payload", () => {
      it("responds with status 400", async () => {
        const response = await request(factory.app)
          .put("/cards/1")
          .set("Accept", "application/json")
          .send(emptyModifiedCardFixture);

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Validation failed");
      });
    });

    describe("with a correct payload", () => {
      it("responds with status 200", async () => {
        const response = await request(factory.app)
          .put("/cards/1")
          .set("Accept", "application/json")
          .send(modifiedCardFixture);

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/updated/);
      });
    });
  });

  describe("Get one card", () => {
    describe("of unknown id", () => {
      it("responds with status 404", async () => {
        const response = await request(app)
          .get("/cards/10")
          .set("Accept", "application/json");

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch(/not found/);
      });
    });

    describe("of known id", () => {
      it("responds with status 200", async () => {
        const response = await request(app)
          .get("/cards/1")
          .set("Accept", "application/json");

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe("Delete card", () => {
    describe("of unknown id", () => {
      it("responds with status 404", async () => {
        const response = await request(app)
          .delete("/cards/10")
          .set("Accept", "application/json");

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch(/not found/);
      });
    });

    describe("of known id", () => {
      it("responds with status 200", async () => {
        const response = await request(app)
          .delete("/cards/1")
          .set("Accept", "application/json");

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/deleted/);
      });
    });
  });
});
