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
const user_service_1 = require("../../services/user.service");
const responseBuilder_1 = require("../../utils/responseBuilder");
const register = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const existingUser = yield user_service_1.userService.getUserByEmail(email);
    if (existingUser) {
        res.status(400).json((0, responseBuilder_1.buildErrorMessage)(400, "User already Exists!"));
        return;
    }
    const newUser = yield user_service_1.userService.addUser(req.body);
    yield newUser.save();
    res
        .status(201)
        .json((0, responseBuilder_1.buildSuccessMessage)(201, "User added successfully!", newUser));
}));
exports.default = register;
