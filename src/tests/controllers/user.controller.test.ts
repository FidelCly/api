/* eslint-disable no-undef */
import request from "supertest";
import app from "../../app";
import { TestFactory } from "../factory";
import { userFixture } from "../seeds/user.seed";

describe("Testing user controller", () => {
  // Create instances
  const factory = new TestFactory();

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
      const response = await request(app)
        .post("/users")
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("Validation failed");
    });

    it("responds with status 201", async () => {
      const response = await request(app)
        .post("/users")
        .send(userFixture)
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toMatch(/created/);
    });
  });

  describe("Update user", () => {
    beforeAll(async () => {});

    it("responds with status 404", async () => {
      const response = await request(factory.app)
        .put("/users/10")
        .set("Accept", "application/json")
        .send(testUserModified);

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toMatch(/not found/);
    });

    it("responds with status 400", async () => {
      const response = await request(factory.app)
        .put("/users/1")
        .set("Accept", "application/json")
        .send(testUserModifiedEmpty);

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("Validation failed");
    });

    it("responds with status 200", async () => {
      const response = await request(factory.app)
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
      const response = await request(app)
        .get("/users/10")
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toMatch(/not found/);
    });

    it("responds with status 200", async () => {
      const response = await request(app)
        .get("/users/1")
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Delete user", () => {
    it("responds with status 404", async () => {
      const response = await request(app)
        .delete("/users/10")
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toMatch(/not found/);
    });

    it("responds with status 200", async () => {
      const response = await request(app)
        .delete("/users/1")
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toMatch(/deleted/);
    });
  });
});
