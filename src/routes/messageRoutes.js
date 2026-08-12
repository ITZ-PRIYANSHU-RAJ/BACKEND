import express from "express";
import {
    sendMessage,
    getMessages
} from "../controllers/messageController.js"
import protectRoute from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/send",protectRoute,sendMessage);
router.get("/:userId",protectRoute,getMessages);

export default router;