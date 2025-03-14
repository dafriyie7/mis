// /routes/userRoutes.js

import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/userController.js"; // Import user controller

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get user profile (requires authentication)
router.get("/profile", getUserProfile);

export default router;
