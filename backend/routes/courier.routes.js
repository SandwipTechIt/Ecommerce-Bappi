import express from "express";
const router = express.Router();

import { createCourier, getCourier } from "../controllers/courier.controller.js";

router.post("/createCourier", createCourier);
router.get("/getCourier", getCourier);

export default router;
