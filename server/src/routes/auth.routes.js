import express from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/change-password", AuthController.changePassword);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/verify-email", AuthController.verifyEmail);

router.get("/me", authMiddleware, AuthController.fetchData);


export default router;
