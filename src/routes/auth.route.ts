import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import validate from "../middlewares/validate";
import { loginSchema, registerSchema } from "../validators/auth.schema";
import authenticateUser from "../middlewares/authenticateUser";

const authRouter = Router();

authRouter.post("/register", validate(registerSchema), authController.register);
authRouter.post("/login", validate(loginSchema), authController.login);
authRouter.post("/logout", authenticateUser, authController.logout);
authRouter.post("/refresh", authController.refresh);
authRouter.get("/email-verification", authController.emailVerification);
authRouter.post("/reset-password", authController.resetPassword);

export default authRouter;
