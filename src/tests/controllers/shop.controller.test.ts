/* eslint-disable no-undef */
import request from "supertest";
import app from "../../app";
import { TestFactory } from "../factory";
import { shopFixture } from "../seeds/shop.seed";

describe("Testing shop controller", () => {
  // Create instances
  const factory = new TestFactory();

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
      const response = await request(app)
        .post("/shops")
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("Validation failed");
    });

    it("responds with status 201", async () => {
      const response = await request(app)
        .post("/shops")
        .send(shopFixture)
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toMatch(/created/);
    });
  });

  describe("Update shop", () => {
    it("responds with status 404", async () => {
      const response = await request(factory.app)
        .put("/shops/10")
        .set("Accept", "application/json")
        .send(testshopModified);

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toMatch(/not found/);
    });

    it("responds with status 400", async () => {
      const response = await request(factory.app)
        .put("/shops/1")
        .set("Accept", "application/json")
        .send(testshopModifiedEmpty);

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("Validation failed");
    });

    it("responds with status 200", async () => {
      const response = await request(factory.app)
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
      const response = await request(app)
        .get("/shops/10")
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toMatch(/not found/);
    });

    it("responds with status 200", async () => {
      const response = await request(app)
        .get("/shops/1")
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Get all shops", () => {
    it("responds with status 200", async () => {
      const response = await request(app)
        .get("/shops/")
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Delete shop", () => {
    it("responds with status 404", async () => {
      const response = await request(app)
        .delete("/shops/10")
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toMatch(/not found/);
    });

    it("responds with status 200", async () => {
      const response = await request(app)
        .delete("/shops/1")
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toMatch(/deleted/);
    });
  });
});
