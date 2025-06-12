"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.signRefreshToken = exports.signAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const signAccessToken = (payload, expiresIn = 15 * 60 * 1000) => {
    return jsonwebtoken_1.default.sign(payload, JWT_ACCESS_SECRET, { expiresIn });
};
exports.signAccessToken = signAccessToken;
const signRefreshToken = (payload, expiresIn = 15 * 60 * 1000) => {
    return jsonwebtoken_1.default.sign(payload, JWT_REFRESH_SECRET, { expiresIn });
};
exports.signRefreshToken = signRefreshToken;
const verifyAccessToken = (token) => {
    return jsonwebtoken_1.default.verify(token, JWT_ACCESS_SECRET);
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, JWT_REFRESH_SECRET);
};
exports.verifyRefreshToken = verifyRefreshToken;
