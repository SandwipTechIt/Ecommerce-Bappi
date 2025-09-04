import express from "express";
const router = express.Router();
import { uploadProductImages, handleUploadError } from "../middlewares/upload.middleware.js";
import { 
    createProduct, 
    deleteProduct, 
    getAllProducts, 
    getProductById, 
    getProductBySlug, 
    getAllProductsByCategory,
    updateProduct,
    getAllProductsWithDetails,
    getAllProductWithOrders,
    stockOutProducts,
    getTopSellingProducts,
    latestProducts
} from "../controllers/product.controller.js";

router.get("/products", getAllProducts);
router.get("/stockOutProducts", stockOutProducts);
router.get("/product/:id", getProductById);
router.get("/getProductBySlug/:slug", getProductBySlug);
router.get("/getAllProductsWithDetails", getAllProductsWithDetails);
router.get("/getAllProductWithOrders/:id", getAllProductWithOrders);
router.get("/getAllProductsByCategory/:id", getAllProductsByCategory);
router.post("/createProduct",uploadProductImages, handleUploadError, createProduct);
router.put("/product/:id", uploadProductImages, handleUploadError, updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

router.get("/getTopSellingProducts", getTopSellingProducts);
router.get("/latestProducts", latestProducts);

export default router;
