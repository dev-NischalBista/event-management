"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorizeRole = (roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !roles.includes(user.role)) {
            res.status(403).json({ message: "Forbidden: Access denied" });
            return;
        }
        next();
    };
};
exports.default = authorizeRole;
