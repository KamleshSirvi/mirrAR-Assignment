// __tests__/index.test.js

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");

describe("Server Initialization Tests", () => {
  // Connect to the database before running tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL);
  });

  // Close the MongoDB connection after all tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should connect to the database and start the server", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Welcome to your API");
  });

  // Add more tests as needed for server initialization, error handling, etc.
});
