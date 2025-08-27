import express from "express";
import { createCategory, getAllCategories, deleteCategory } from "../controllers/catrgory.controller.js";
import { uploadCategoryImage, handleUploadError } from "../middlewares/upload.middleware.js";
const router = express.Router();

router.post("/createCategory", uploadCategoryImage, handleUploadError, createCategory);
router.get("/getAllCategories", getAllCategories);
router.delete("/deleteCategory/:id", deleteCategory);


export default router;
