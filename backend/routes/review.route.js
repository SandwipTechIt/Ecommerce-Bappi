import express from "express";

const router = express.Router();

import { createReview, getReviews,deleteReview } from "../controllers/review.controller.js";
import { uploadReviewImage, handleUploadError } from "../middlewares/upload.middleware.js";

router.post("/createReview", uploadReviewImage, handleUploadError, createReview);
router.get("/getReviews", getReviews);
router.delete("/deleteReview/:id", deleteReview);

export default router;
