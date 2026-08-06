import express from 'express';

import { protectRoute } from '../middlewares/authMiddleware.js';
import { getCurrentUser, loginUser, logoutUser, registerUser } from '../controllers/authController.js';


const router = express.Router();

router.post("/register", registerUser);
router.post("/login",loginUser);


router.post("/logout",protectRoute,logoutUser);
router.post("/me",protectRoute,getCurrentUser);

export default router;