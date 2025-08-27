import express from "express";
const router = express.Router();

import { createMessage, deleteMessage, getAllMessages, getMessage } from "../controllers/message.controller.js";

router.post("/sendMessage", createMessage);
router.get("/getAllMessages", getAllMessages);
router.get("/getMessage/:id", getMessage);
router.delete("/deleteMessage/:id", deleteMessage);


export default router;
