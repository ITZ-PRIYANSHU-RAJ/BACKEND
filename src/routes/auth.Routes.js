import express from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";

import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getMe,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/me", protectRoute, getMe);
router.get("/current-user", protectRoute, getCurrentUser);

// Logout
router.post("/logout", logoutUser);

export default router;