import express from "express";
import { signup, login } from "../controllers/user.controller.js";
import { verifySignupOtp } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-signup-otp", verifySignupOtp);
router.post("/login", login);

export default router;