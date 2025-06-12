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
const refresh = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.RefreshToken;
    if (!refreshToken) {
        res.status(401).json((0, responseBuilder_1.buildErrorMessage)(401, "Invalid RefreshToken"));
        return;
    }
    const decoded = (0, jwt_1.verifyRefreshToken)(refreshToken);
    const user = yield user_service_1.userService.getUserById(decoded === null || decoded === void 0 ? void 0 : decoded._id);
    if (!user) {
        res.status(401).json((0, responseBuilder_1.buildErrorMessage)(401, "User not found!"));
        return;
    }
    const newAccessToken = (0, jwt_1.signAccessToken)({
        _id: user._id,
        email: user.email,
        role: user.role,
    });
    res.cookie("AccessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
    });
    res.status(200).json((0, responseBuilder_1.buildSuccessMessage)(200, "Access Token Refreshed!"));
}));
exports.default = refresh;
