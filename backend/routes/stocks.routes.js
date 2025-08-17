import express from "express";
import { deleteStock, getAllStocks, getStock, updateStock} from "../controllers/stocks.controller.js";

const router = express.Router();

router.get("/allStocks", getAllStocks);
router.get("/getStock/:id", getStock);
router.put("/updateStock/:id", updateStock);
router.delete("/deleteStock/:id", deleteStock);

export default router;
