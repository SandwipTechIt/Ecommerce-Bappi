import express from "express";
const router = express.Router();

// import { createAdmin, loginAdmin, logoutAdmin, updateAdmin } from "../controllers/admin.controller";
import { loginAdmin, updateAdmin } from "../controllers/admin.controller.js";

router.post("/loginAdmin", loginAdmin);
// router.post("/createAdmin", createAdmin);
// router.post("/logoutAdmin", logoutAdmin);
router.post("/updateAdmin/:id", updateAdmin);

export default router;
