"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const register_controller_1 = __importDefault(require("./register.controller"));
const login_controller_1 = __importDefault(require("./login.controller"));
const logout_controller_1 = __importDefault(require("./logout.controller"));
const refresh_controller_1 = __importDefault(require("./refresh.controller"));
const emailVerification_controller_1 = __importDefault(require("./emailVerification.controller"));
const resetPassword_controller_1 = __importDefault(require("./resetPassword.controller"));
exports.authController = {
    register: register_controller_1.default,
    login: login_controller_1.default,
    logout: logout_controller_1.default,
    refresh: refresh_controller_1.default,
    emailVerification: emailVerification_controller_1.default,
    resetPassword: resetPassword_controller_1.default,
};
