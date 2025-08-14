import express from "express";
import { createOrder, deleteOrder, getOrder, getOrders, updateOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/createOrder", createOrder);
router.get("/getOrders", getOrders);
router.get("/getOrder/:id", getOrder);
router.put("/updateOrder/:id", updateOrder);
router.delete("/deleteOrder/:id", deleteOrder);

export default router;
