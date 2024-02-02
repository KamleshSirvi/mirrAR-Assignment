const mongoose = require("mongoose");

const VariantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  sku: {
    type: String,
    required: true,
  },
  additional_cost: {
    type: Number,
    required: true,
  },
  stock_count: {
    type: Number,
    required: true,
  },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      min: 2,
      max: 50,
    },
    description: {
      type: String,
      required: true,
      min: 2,
      max: 2000,
    },
    price: {
      type: Number,
      required: true,
    },
    variant: [VariantSchema],
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
