"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = __importDefault(require("../middlewares/validate"));
const auth_schema_1 = require("../validators/auth.schema");
const authenticateUser_1 = __importDefault(require("../middlewares/authenticateUser"));
const authControllers_1 = require("../controllers/authControllers");
const authRouter = (0, express_1.Router)();
authRouter.post("/register", (0, validate_1.default)(auth_schema_1.registerSchema), authControllers_1.authController.register);
authRouter.post("/login", (0, validate_1.default)(auth_schema_1.loginSchema), authControllers_1.authController.login);
authRouter.post("/logout", authenticateUser_1.default, authControllers_1.authController.logout);
authRouter.post("/refresh", authControllers_1.authController.refresh);
authRouter.get("/email-verification", authControllers_1.authController.emailVerification);
authRouter.post("/reset-password", authControllers_1.authController.resetPassword);
exports.default = authRouter;
