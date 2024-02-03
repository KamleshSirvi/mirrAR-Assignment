const productModel = require("../models/Productmodel");

const addProduct = async (req, res) => {
  const { name, description, price, variants } = req.body;
  try {
    if (!name || !description || !price || !variants) {
      return res
        .status(400)
        .json({ error: "Incomplete or invalid product data" });
    }

    const existingProduct = await productModel.findOne({ name });
    if (existingProduct) {
      return res
        .status(409)
        .json({ error: "Product with this name already exists" });
    }

    const newProduct = new productModel({
      name,
      description,
      price,
      variant: variants,
    });

    await newProduct.save();
    res.status(201).json({
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      variants: newProduct.variant,
    });
  } catch (err) {
    console.error("Error adding product:", err.message);
    res.status(500).json({ error: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    if (!products || products.length === 0) {
      return res.status(204).json({ message: "No products found" });
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getoneProduct = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid product ID format" });
    }

    const product = await productModel.findById({ _id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const deleteOneProduct = async (req, res) => {
  const productName = req.params.name;

  try {
    if (!productName) {
      return res.status(400).json({ error: "Product name not provided" });
    }

    const deletedProduct = await productModel.findOneAndDelete({
      name: productName,
    });

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: `Product with name "${productName}" not found` });
    }

    res.status(200).json({
      message: `Product with name "${productName}" deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getData = async (req, res) => {
  const productName = req.params.name;

  try {
    if (!productName) {
      return res.status(400).json({ error: "Product name not provided" });
    }
    const Product = await productModel.findOne({
      name: productName,
    });

    if (Product) {
      res.status(200).json(Product);
    } else {
      return res
        .status(404)
        .json({ message: `Product with name "${productName}" not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateData = async (req, res) => {
  const { _id } = req.params;
  const { name, description, price, variants } = req.body;

  try {
    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid product ID format" });
    }

    const existingProduct = await productModel.findById(_id);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    existingProduct.name = name || existingProduct.name;
    existingProduct.description = description || existingProduct.description;
    existingProduct.price = price || existingProduct.price;

    existingProduct.variant = [];

    variants.forEach((variant) => {
      existingProduct.variant.push(variant);
    });

    await existingProduct.save();

    res.status(200).json({
      message: "Product updated successfully",
      updatedProduct: existingProduct,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const searchProduct = async (req, res) => {
  const searchTerm = req.query.term;

  try {
    if (!searchTerm) {
      return res
        .status(400)
        .json({ error: "Name parameter is required for search." });
    }
    const searchResults = await productModel.find({
      $or: [
        { name: { $regex: new RegExp(searchTerm, "i") } },
        { description: { $regex: new RegExp(searchTerm, "i") } },
        { "variants.name": { $regex: new RegExp(searchTerm, "i") } },
      ],
    });

    if (searchResults.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found matching the provided name." });
    }

    res.status(200).json(searchResults);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getoneProduct,
  deleteOneProduct,
  getData,
  updateData,
  searchProduct,
};
