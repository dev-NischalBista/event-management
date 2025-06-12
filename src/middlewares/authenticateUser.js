"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../utils/jwt");
const authenticateUser = (req, res, next) => {
    const token = req.cookies.AccessToken;
    if (!token) {
        return res.status(401).json({ message: "Access token is missing" });
    }
    try {
        const decoded = (0, jwt_1.verifyAccessToken)(token);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.default = authenticateUser;
