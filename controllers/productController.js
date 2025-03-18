import Product from "../models/Product.js";
import Price from "../models/Price.js";
import Brand from "../models/Brand.js";

// @desc    Get all products with optional filtering, pagination, and sorting
// @route   GET /api/products
export const getProducts = async (req, res) => {
  try {
    const {
      category,
      location,
      brand,
      keyword,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    let query = {};
    if (category) query.category = category;
    if (location) query.location = location;
    if (brand) query.brand = brand;
    if (keyword) query.name = { $regex: keyword, $options: "i" };

    const products = await Product.find(query)
      .populate("category", "name")
      .populate("location", "name city country")
      .populate("price", "amount currency")
      .populate("brand", "name logo")
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    const total = await Product.countDocuments(query);

    res.status(200).json({ total, page, limit, products });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get a single product
// @route   GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name")
      .populate("location", "name city country")
      .populate("price", "amount currency")
      .populate("brand", "name logo")
      .lean();

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Create a new product with price
// @route   POST /api/products
export const createProduct = async (req, res) => {
  try {
    const { name, description, category, brand, images, location, priceData } =
      req.body;
    if (!name || !category || !location)
      return res.status(400).json({ message: "Missing required fields" });

    const newProduct = new Product({
      name,
      description,
      category,
      brand,
      images,
      location,
    });
    const savedProduct = await newProduct.save();

    if (priceData) {
      const newPrice = new Price({
        product: savedProduct._id,
        amount: priceData.amount,
        currency: priceData.currency || "GHC",
      });
      const savedPrice = await newPrice.save();
      savedProduct.price = savedPrice._id;
      await savedProduct.save();
    }

    const populatedProduct = await Product.findById(savedProduct._id)
      .populate("category", "name")
      .populate("location", "name city country")
      .populate("price", "amount currency")
      .populate("brand", "name logo");

    res.status(201).json(populatedProduct);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid product data", error: error.message });
  }
};

// @desc    Update a product and price if provided
// @route   PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const { priceData, ...updateData } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    if (priceData) {
      const updatedPrice = await Price.findOneAndUpdate(
        { product: updatedProduct._id },
        { amount: priceData.amount, currency: priceData.currency || "GHC" },
        { new: true, upsert: true }
      );
      updatedProduct.price = updatedPrice._id;
      await updatedProduct.save();
    }

    const populatedProduct = await Product.findById(updatedProduct._id)
      .populate("category", "name")
      .populate("location", "name city country")
      .populate("price", "amount currency")
      .populate("brand", "name logo");

    res.status(200).json(populatedProduct);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid product data", error: error.message });
  }
};

// @desc    Delete a product and associated price
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    if (deletedProduct.price)
      await Price.findByIdAndDelete(deletedProduct.price);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
