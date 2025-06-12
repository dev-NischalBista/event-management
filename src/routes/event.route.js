"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateUser_1 = __importDefault(require("../middlewares/authenticateUser"));
const event_controller_1 = require("../controllers/event.controller");
const authorizeRole_1 = __importDefault(require("../middlewares/authorizeRole"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const event_schema_1 = require("../validators/event.schema");
const eventRouter = (0, express_1.Router)();
eventRouter.get("/events", authenticateUser_1.default, event_controller_1.eventController.getEvents);
eventRouter.post("/events", (0, validate_1.default)(event_schema_1.eventSchema), authenticateUser_1.default, (0, authorizeRole_1.default)(["admin"]), event_controller_1.eventController.addEvent);
exports.default = eventRouter;
