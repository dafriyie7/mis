import Product from "../models/Product.js";
import Price from "../models/Price.js";

// @desc    Get all products (with optional filtering by category or location)
// @route   GET /api/products
export const getProducts = async (req, res) => {
  try {
    const { category, location, keyword } = req.query;
    let query = {};

    if (category) query.category = category;
    if (location) query.location = location;
    if (keyword) query.name = { $regex: keyword, $options: "i" };

    // Fetch products with populated category, location, and price
    const products = await Product.find(query)
      .populate("category", "name") // Populate category
      .populate("location", "name city country") // Populate location
      .populate({
        path: "price", // Populate the price field
        select: "amount currency", // Specify the fields to be populated
      });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc    Get a single product
// @route   GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name")
      .populate("location", "name city country")
      .populate("price", "amount currency");

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc    Create a new product with price
// @route   POST /api/products
export const createProduct = async (req, res) => {
  try {
    const { name, description, category, brand, images, location, priceData } =
      req.body;

    // Validate required fields
    if (!name || !category || !location) {
      return res.status(400).json({ message: "All required fields" });
    }

    // Create a new product
    const newProduct = new Product({
      name,
      description,
      category,
      brand,
      images,
      location,
    });

    // Save the product
    const savedProduct = await newProduct.save();

    // Create and link price if priceData is provided
    if (priceData) {
      const newPrice = new Price({
        product: savedProduct._id,
        amount: priceData.amount,
        currency: priceData.currency || "GHC",
      });

      const savedPrice = await newPrice.save();

      // Update product with the price reference
      savedProduct.price = savedPrice._id;
      await savedProduct.save();
    }

    // Return the product with populated references
    const populatedProduct = await Product.findById(savedProduct._id)
      .populate("category", "name")
      .populate("location", "name city country")
      .populate("price", "amount currency");

    res.status(201).json(populatedProduct);
  } catch (error) {
    res.status(400).json({ message: "Invalid product data", error });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const { priceData } = req.body;

    // Validate required fields before updating
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    // If price data exists, update or create price
    if (priceData) {
      const price = await Price.findOneAndUpdate(
        { product: updatedProduct._id },
        { amount: priceData.amount, currency: priceData.currency || "GHC" },
        { new: true, upsert: true }
      );
      updatedProduct.price = price._id;
      await updatedProduct.save();
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: "Invalid product data", error });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    // Delete the associated price if it exists
    if (deletedProduct.price) {
      await Price.findByIdAndDelete(deletedProduct.price);
    }

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
