import express from "express";
import { getStaticData } from "../controllers/statics.controller.js";

const router = express.Router();

router.get("/getStaticData", getStaticData);

export default router;