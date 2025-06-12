"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const responseBuilder_1 = require("../utils/responseBuilder");
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || "error";
    console.log(err.stack);
    res.status(statusCode).json((0, responseBuilder_1.buildErrorMessage)(statusCode, err.message, Object.assign({}, (process.env.NODE_ENV === "development" && { stack: err.stack }))));
};
exports.globalErrorHandler = globalErrorHandler;
