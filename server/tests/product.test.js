const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index"); 
const Product = require("../models/Productmodel");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_TEST_URL);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Product CRUD Operations", () => {
  let productId;

  // Test case for creating a new product
  it("should create a new product", async () => {
    const response = await request(app)
      .post("/api/products/addProduct")
      .send({
        name: "Test Product",
        price: 19.99,
        description: "This is a test product",
        variants: [
          {
            name: "Variant 1",
            sku: "SKU001",
            additional_cost: 5,
            stock_count: 10,
          },
        ],
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("_id");
    productId = response.body._id;
  });

  // Test case for getting all products
  it("should get all products", async () => {
    const response = await request(app).get("/api/products");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  // Test case for getting a single product by ID
  it("should get a single product by ID", async () => {
    const response = await request(app).get(`/api/products/${productId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("_id", productId);
  });

  // Test case for updating a product
  it("should update a product", async () => {
    const response = await request(app)
      .put(`/api/products/updateExistingProduct/${productId}`)
      .send({
        name: "Updated Test Product",
        price: 25.99,
        description: "This is an updated test product",
        variants: [
          {
            name: "Updated Variant 1",
            sku: "SKU002",
            additional_cost: 8,
            stock_count: 15,
          },
        ],
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("name", "Updated Test Product");
  });

  // Test case for deleting a product
  it("should delete a product", async () => {
    const response = await request(app).delete(`/api/products/${productId}`);

    expect(response.statusCode).toBe(204);

    // Verify the product is deleted
    const deletedProduct = await Product.findById(productId);
    expect(deletedProduct).toBeNull();
  });

  // Test case for searching products
  it("should search products by name, description, and variant", async () => {
    const response = await request(app)
      .get("/api/products/searchProduct")
      .query({ term: "Updated Test" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
