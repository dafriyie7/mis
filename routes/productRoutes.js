// /routes/productRoutes.js

import express from "express";
import {
  getProducts,
  createProduct,
} from "../controllers/productController.js"; // Import controllers

const router = express.Router();

// Get all products
router.get("/", getProducts);

// Create a new product
router.post("/", createProduct);

export default router;
