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
exports.userController = void 0;
const jwt_1 = require("../utils/jwt");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const responseBuilder_1 = require("../utils/responseBuilder");
const user_service_1 = require("../services/user.service");
const getUsers = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = user_service_1.userService.getUsers();
    res.status(200).json((0, responseBuilder_1.buildSuccessMessage)(200, "Users", users));
}));
const getByUserId = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.AccessToken;
    if (!token) {
        res.status(401).json((0, responseBuilder_1.buildErrorMessage)(401, "Unauthorized"));
        return;
    }
    const decoded = (0, jwt_1.verifyAccessToken)(token);
    const userId = decoded === null || decoded === void 0 ? void 0 : decoded._id;
    if (!userId) {
        res.status(401).json((0, responseBuilder_1.buildErrorMessage)(401, "Unauthorized"));
        return;
    }
    const user = yield user_service_1.userService.getUserById(userId);
    res.status(200).json((0, responseBuilder_1.buildSuccessMessage)(200, "User Details", user));
}));
exports.userController = {
    getUsers: getUsers,
    getByUserId: getByUserId,
};
