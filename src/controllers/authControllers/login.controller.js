"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const jwt_1 = require("../../utils/jwt");
const responseBuilder_1 = require("../../utils/responseBuilder");
const user_service_1 = require("../../services/user.service");
const login = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existingUser = yield user_service_1.userService.getUserByEmail(email);
    if (!existingUser) {
        res.status(400).json((0, responseBuilder_1.buildErrorMessage)(400, "Invalid E-mail!"));
        return;
    }
    const isPasswordValid = yield existingUser.comparePassword(password);
    if (!isPasswordValid) {
        res.status(401).json((0, responseBuilder_1.buildErrorMessage)(401, "Invalid Password!"));
        return;
    }
    const token = (0, jwt_1.signAccessToken)({
        _id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
    });
    const refreshToken = (0, jwt_1.signRefreshToken)({
        _id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
    });
    res.cookie("AccessToken", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 15 * 1000,
    });
    res.cookie("RefreshToken", refreshToken, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days
    });
    res.status(200).json((0, responseBuilder_1.buildSuccessMessage)(200, "Login Successfull!", {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        token: token,
    }));
}));
exports.default = login;
