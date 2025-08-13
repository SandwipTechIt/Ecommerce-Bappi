import express from "express";
const router = express.Router();
import { protect } from "../middlewares/auth.middleware.js";
import { uploadProductImages, handleUploadError } from "../middlewares/upload.middleware.js";
import { validateProductData, validateObjectId } from "../middlewares/validation.middleware.js";
import { 
    createProduct, 
    deleteProduct, 
    getAllProducts, 
    getProductById 
} from "../controllers/product.controller.js";

// Create product with image upload and validation
router.post("/createProduct", protect, uploadProductImages, handleUploadError, validateProductData, createProduct);

// Get all products
router.get("/products", getAllProducts);

// Get product by ID
router.get("/product/:id", validateObjectId, getProductById);

// Delete product (with image cleanup)
router.delete("/product/:id", protect, validateObjectId, deleteProduct);

export default router;
