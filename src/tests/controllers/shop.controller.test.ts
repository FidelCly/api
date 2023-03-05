/* eslint-disable no-undef */
import request from "supertest";
import { TestFactory } from "../factory";
import {
  emptyModifiedShopFixture,
  farAwayShopFixture,
  modifiedShopFixture,
  shopFixture,
} from "../seeds";

describe("Testing shop controller", () => {
  // Create instances
  const factory = new TestFactory();

  beforeAll(async () => {
    await factory.init();
  });

  afterAll(async () => {
    await factory.close();
  });

  describe("Create shop", () => {
    describe("with an empty payload", () => {
      it("responds with status 400", async () => {
        const response = await request(factory.app)
          .post("/shops")
          .set("Accept", "application/json");

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Validation failed");
      });
    });

    describe("with a correct payload", () => {
      it("responds with status 201", async () => {
        const response = await request(factory.app)
          .post("/shops")
          .send(shopFixture)
          .set("Accept", "application/json");

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toMatch(/created/);
      });
    });
  });

  describe("Update shop", () => {
    describe("of unknown id", () => {
      it("responds with status 404", async () => {
        const response = await request(factory.app)
          .put("/shops/10")
          .set("Accept", "application/json")
          .send(modifiedShopFixture);

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch(/not found/);
      });
    });

    describe("with incorrect payload", () => {
      it("responds with status 400", async () => {
        const response = await request(factory.app)
          .put("/shops/1")
          .set("Accept", "application/json")
          .send(emptyModifiedShopFixture);

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Validation failed");
      });
    });

    describe("of known id", () => {
      it("responds with status 200", async () => {
        const response = await request(factory.app)
          .put("/shops/1")
          .set("Accept", "application/json")
          .send(modifiedShopFixture);

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/updated/);
      });
    });
  });

  describe("Get one shop", () => {
    describe("of unknown id", () => {
      it("responds with status 404", async () => {
        const response = await request(factory.app)
          .get("/shops/10")
          .set("Accept", "application/json");

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch(/not found/);
      });
    });

    describe("of known id", () => {
      it("responds with status 200", async () => {
        const response = await request(factory.app)
          .get("/shops/1")
          .set("Accept", "application/json");

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe("Get all shops", () => {
    describe("without filters", () => {
      it("responds with status 200", async () => {
        const response = await request(factory.app)
          .get("/shops/")
          .set("Accept", "application/json");

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(200);
      });
    });

    describe("with location fitlers", () => {
      it("responds with status 200", async () => {
        await factory.seedShop(farAwayShopFixture);

        const response = await request(factory.app)
          .get("/shops/?d=3000&long=2.3690961&lat=48.8573185")
          .set("Accept", "application/json");

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
      });
    });
  });

  describe("Get one shop's promotions", () => {
    describe("of known id", () => {
      it("responds with status 200", async () => {
        const response = await request(factory.app)
          .get("/shops/1/promotions")
          .set("Accept", "application/json");

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe("Get one shop's clients", () => {
    describe("of known id", () => {
      it("responds with status 200", async () => {
        await factory.seedUser();
        await factory.seedCard();

        const response = await request(factory.app)
          .get("/shops/1/clients")
          .set("Accept", "application/json");

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(1);
      });
    });
  });

  describe("Delete shop", () => {
    describe("of unknown id", () => {
      it("responds with status 404", async () => {
        const response = await request(factory.app)
          .delete("/shops/10")
          .set("Accept", "application/json");

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toMatch(/not found/);
      });
    });

    describe("of known id", () => {
      it("responds with status 200", async () => {
        const response = await request(factory.app)
          .delete("/shops/1")
          .set("Accept", "application/json");

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/deleted/);
      });
    });
  });
});
