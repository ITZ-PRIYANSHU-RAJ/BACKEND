import express from "express";
import { searchUsers } from "../controllers/userController.js";
import protectRoute from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/search",protectRoute,searchUsers);

export default router;