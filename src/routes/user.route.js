"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const authenticateUser_1 = __importDefault(require("../middlewares/authenticateUser"));
const authorizeRole_1 = __importDefault(require("../middlewares/authorizeRole"));
const userRouter = (0, express_1.Router)();
userRouter.get("/users", authenticateUser_1.default, (0, authorizeRole_1.default)(["admin"]), user_controller_1.userController.getUsers);
userRouter.get("/users/me", authenticateUser_1.default, (0, authorizeRole_1.default)(["admin", "user"]), user_controller_1.userController.getByUserId);
exports.default = userRouter;
