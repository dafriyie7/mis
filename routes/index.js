import express from "express";
import productRoutes from "./productRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import locationRoutes from "./locationRoutes.js";
import userRoutes from "./userRoutes.js";

const router = express.Router();

router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/locations", locationRoutes);
router.use("/users", userRoutes);

export default router;
