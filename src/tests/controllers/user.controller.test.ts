/* eslint-disable no-undef */
import request from "supertest";
import app from "../../app";
import { User } from "../../entities";
import { TestFactory } from "../factory";

describe("Testing user controller", () => {
  // Create instances
  const factory = new TestFactory();

  const testUser: User = {
    ...new User(),
    username: "testUsername",
    email: "testEmail@email.com",
  };

  const testUserModified: User = {
    ...testUser,
    username: "testUsernameModified",
  };

  beforeAll(async () => {
    await factory.init();
  });

  afterAll(async () => {
    await factory.close();
  });

  describe("POST /users", () => {
    it("responds with status 400", async () => {
      const response = await request(app)
        .post("/users")
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(response.statusCode).toBe(400);
    });

    it("responds with status 201", async () => {
      const response = await request(app)
        .post("/users")
        .send(testUser)
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(response.statusCode).toBe(201);
    });
  });

  describe("PUT /users/", () => {
    it("responds with status 200", async () => {
      const response = await request(factory.app)
        .put("/users/1")
        .set("Accept", "application/json")
        .send({
          user: testUserModified,
        });

      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(response.statusCode).toBe(200);
    });
  });

  describe("GET /users/", () => {
    it("responds with status 200", async () => {
      const response = await request(app)
        .get("/users/1")
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(response.statusCode).toBe(200);
    });

    it("responds with status 404", async () => {
      const response = await request(app)
        .get("/users/4")
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(response.statusCode).toBe(404);
    });
  });

  describe("DELETE /users/", () => {
    it("responds with status 204", async () => {
      const response = await request(app)
        .delete("/users/1")
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(response.statusCode).toBe(204);
    });

    it("responds with status 404", async () => {
      const response = await request(app)
        .delete("/users/4")
        .set("Accept", "application/json");

      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(response.statusCode).toBe(404);
    });
  });
});
