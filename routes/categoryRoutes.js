// /routes/categoryRoutes.js

import express from "express";
import {
  getCategories,
  createCategory,
} from "../controllers/categoryController.js"; // Import the category controller

const router = express.Router();

// Get all categories
router.get("/", getCategories);

// Create a new category
router.post("/", createCategory);

export default router;
