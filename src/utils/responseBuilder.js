"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildErrorMessage = exports.buildSuccessMessage = void 0;
const buildSuccessMessage = (status, message, data) => ({ success: true, message, data, status });
exports.buildSuccessMessage = buildSuccessMessage;
const buildErrorMessage = (status, message, error) => ({ success: false, message, error, status });
exports.buildErrorMessage = buildErrorMessage;
