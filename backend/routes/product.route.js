import express from "express";
const router = express.Router();
import { uploadProductImages, handleUploadError } from "../middlewares/upload.middleware.js";
import { 
    createProduct, 
    deleteProduct, 
    getAllProducts, 
    getProductById, 
    getProductBySlug, 
    updateProduct,
    getAllProductsWithDetails,
    getAllProductWithOrders
} from "../controllers/product.controller.js";

router.get("/products", getAllProducts);
router.get("/product/:id", getProductById);
router.get("/getProductBySlug/:slug", getProductBySlug);
router.get("/getAllProductsWithDetails", getAllProductsWithDetails);
router.get("/getAllProductWithOrders/:id", getAllProductWithOrders);
router.post("/createProduct",uploadProductImages, handleUploadError, createProduct);
router.put("/product/:id", uploadProductImages, handleUploadError, updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

export default router;
