"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_config_1 = require("jest-config");
const config = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleFileExtensions: [...jest_config_1.defaults.moduleFileExtensions, "mts"],
};
exports.default = config;
