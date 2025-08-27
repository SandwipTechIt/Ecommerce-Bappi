import express from "express";
const router = express.Router();

import { createCoupon, getAllCoupon, getCouponById, updateCoupon, deleteCoupon, validateCoupon } from "../controllers/coupon.controller.js";

router.post("/createCoupon", createCoupon);
router.get("/getAllCoupon", getAllCoupon);
router.get("/getCouponById/:id", getCouponById);
router.put("/updateCoupon/:id", updateCoupon);
router.delete("/deleteCoupon/:id", deleteCoupon);
router.post("/validateCoupon", validateCoupon);

export default router;
