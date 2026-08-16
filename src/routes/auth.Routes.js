import express from "express";
import protectRoute from "../middlewares/authMiddleware.js";

import {
  getMe,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/logout", protectRoute, logoutUser);
router.get("/me", getMe);

export default router;