"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateUser_1 = __importDefault(require("../middlewares/authenticateUser"));
const ticket_controller_1 = require("../controllers/ticket.controller");
const authorizeRole_1 = __importDefault(require("../middlewares/authorizeRole"));
const ticketRouter = (0, express_1.Router)();
ticketRouter.post("/tickets/:eventId/getTicket", authenticateUser_1.default, ticket_controller_1.ticketController.bookTicket);
ticketRouter.get("/tickets", authenticateUser_1.default, (0, authorizeRole_1.default)(["admin"]), ticket_controller_1.ticketController.getBookedTickets);
exports.default = ticketRouter;
