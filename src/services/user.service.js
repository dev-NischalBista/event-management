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
exports.userService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const appError_1 = require("../utils/appError");
class UserService {
    constructor() { }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_model_1.default.find({}, "-password -__v").sort({ createdAt: -1 });
            return users;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                throw new appError_1.AppError("User not found!", 404);
            }
            return user;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = user_model_1.default.findById(id, "-password -__v");
            if (!user) {
                throw new appError_1.AppError("User not found!", 404);
            }
            return user;
        });
    }
    addUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.create(data);
        });
    }
}
exports.userService = new UserService();
