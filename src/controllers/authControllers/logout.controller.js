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
const responseBuilder_1 = require("../../utils/responseBuilder");
const logout = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("AccessToken", {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    });
    res.clearCookie("RefreshToken", {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    });
    res.status(200).json((0, responseBuilder_1.buildSuccessMessage)(200, "Logout Successfull!"));
}));
exports.default = logout;
