import express from "express";
const router = express.Router();
import { uploadProductImages, handleUploadError } from "../middlewares/upload.middleware.js";
import { 
    createProduct, 
    deleteProduct, 
    getAllProducts, 
    getProductById, 
    updateProduct
} from "../controllers/product.controller.js";

router.get("/products", getAllProducts);
router.get("/product/:id", getProductById);
router.post("/createProduct",uploadProductImages, handleUploadError, createProduct);
router.put("/product/:id", uploadProductImages, handleUploadError, updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

export default router;
