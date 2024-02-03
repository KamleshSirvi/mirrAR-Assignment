const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const ProductModel = require("../models/Productmodel"); // Adjust the path accordingly

let mongoServer;
let db;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = mongoose.connection;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  // Clear the database before each test
  await db.dropDatabase();
});

describe("Product Model Tests", () => {
  it("should save a product to the database", async () => {
    const sampleProduct = {
      name: "Test Product",
      description: "This is a test product",
      price: 19.99,
      variant: [
        {
          name: "Variant 1",
          sku: "SKU123",
          additional_cost: 5.99,
          stock_count: 50,
        },
      ],
    };

    const product = new ProductModel(sampleProduct);
    const savedProduct = await product.save();

    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.name).toBe(sampleProduct.name);
    expect(savedProduct.price).toBe(sampleProduct.price);
    expect(savedProduct.variant).toHaveLength(1);
    expect(savedProduct.variant[0].name).toBe(sampleProduct.variant[0].name);
  });

  // Add more test cases for your model as needed
});
