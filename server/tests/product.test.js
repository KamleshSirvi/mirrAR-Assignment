const request = require("supertest");
const app = require("../app");
const ProductModel = require("../models/Productmodel");

// add a new product
test("should add new product", async () => {
  const response = await request(app)
    .post("/api/products/addProduct")
    .send({
      name: "Product 4",
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
  expect(response.body.variants[0]).toHaveProperty("_id"); // Adjusted assertion
  productId = response.body.variants[0]._id; // Updated assignment
}, 15000);

// get all the products
test("should get all products", async () => {
  const response = await request(app).get("/api/products");

  expect(response.statusCode).toBe(200);
  expect(response.body).toBeInstanceOf(Array);
}, 10000);

// get one product by id
test("should get a single product by id", async () => {
  const productId = "65bf1ed925c1bcab477614bf";
  const response = await request(app).get(`/api/products/${productId}`);

  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty("_id", productId);
});

// update the product by Id
test("should update product", async () => {
  const productId = "65bf1ed925c1bcab477614bf";
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

  expect(response.body).toHaveProperty("updatedProduct");

  expect(response.body.updatedProduct).toHaveProperty(
    "name",
    "Updated Test Product"
  );
});

// delete the product
test("should delete a product", async () => {
  const productName = "Product 4";
  const response = await request(app).delete(`/api/products/${productName}`);

  expect(response.statusCode).toBe(204);

  // Verify the product is deleted
  const deletedProduct = await ProductModel.findOne({ name: productName });
  expect(deletedProduct).toBeNull();
}, 15000);

// search products by its name, description and variants
test("should search product by name, description and variants", async () => {
  const response = await request(app)
    .get("/api/products/searchProduct")
    .query({ term: "Product 1" });

  expect(response.statusCode).toBe(200);
  expect(response.body).toBeInstanceOf(Array);
  expect(response.body.length).toBeGreaterThan(0);
}, 15000);
