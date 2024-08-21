import express from "express";
import { signup } from "../controllers/authController";

// import { verifyToken } from "../middleware/verifyToken.ts";

const router = express.Router();

// router.get("/check-auth", verifyToken, checkAuth);

router.post("/sign-up", signup);
// router.post("/login", login);
// router.post("/logout", logout);

// router.post("/verify-email", verifyEmail);
// router.post("/forgot-password", forgotPassword);

// router.post("/reset-password/:token", resetPassword);

export default router;