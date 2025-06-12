"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        res.status(400).json({
            message: "Validation failed",
            errors: errors,
        });
    }
    req.body = result.data;
    next();
};
exports.default = validate;
