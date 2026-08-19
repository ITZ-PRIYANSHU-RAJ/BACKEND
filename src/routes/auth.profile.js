import express from "express";
import{
    updateProfile,
    getProfile,
} from "../controllers/profileController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.put("/update",protectRoute,updateProfile);

router.get("/:userId",protectRoute,getProfile);

export default router;