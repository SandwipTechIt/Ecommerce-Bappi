import express from "express";
import { getStaticData,getAllStatics } from "../controllers/statics.controller.js";

const router = express.Router();

router.get("/getStaticData", getStaticData);
router.get("/getAllStatics", getAllStatics);

export default router;