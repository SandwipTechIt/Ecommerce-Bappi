import express from "express";
import { createSlogan, getSlogan } from "../controllers/slogan.controller.js";
import { uploadSloganImage, handleUploadError } from "../middlewares/upload.middleware.js";
const router = express.Router();

router.post("/createSlogan", uploadSloganImage, handleUploadError, createSlogan);
router.get("/getSlogan", getSlogan);

export default router;
