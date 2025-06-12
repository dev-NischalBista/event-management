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
exports.ticketController = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const event_service_1 = require("../services/event.service");
const socketServer_1 = require("../socketServer");
const responseBuilder_1 = require("../utils/responseBuilder");
const ticket_service_1 = require("../services/ticket.service");
const bookTicket = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId } = req.params;
    const { userId, type = "standard" } = req.body;
    const event = yield event_service_1.eventService.getEventById(eventId);
    if (!event) {
        res.status(404).json((0, responseBuilder_1.buildErrorMessage)(404, "No Event Found!"));
        return;
    }
    const now = Date.now();
    if (now < event.registrationStart.getTime()) {
        res
            .status(400)
            .json((0, responseBuilder_1.buildErrorMessage)(400, "Registration has not started yet!"));
        return;
    }
    else if (now > event.registrationEnd.getTime()) {
        res.status(400).json((0, responseBuilder_1.buildErrorMessage)(400, "Registration has ended!"));
        return;
    }
    if (event.attendees.length >= event.capacity) {
        res.status(400).json((0, responseBuilder_1.buildErrorMessage)(400, "Event is fully booked!"));
        return;
    }
    const existingTicket = yield ticket_service_1.ticketService.getTicket(userId, eventId);
    if (existingTicket) {
        res
            .status(400)
            .json((0, responseBuilder_1.buildErrorMessage)(400, "You have already booked a ticket for this event."));
        return;
    }
    const pricing = event.pricing;
    const ticketPrice = pricing[type];
    if (typeof ticketPrice !== "number") {
        res.status(400).json((0, responseBuilder_1.buildErrorMessage)(400, "Invalid Ticket Type!"));
        return;
    }
    const ticket = yield ticket_service_1.ticketService.bookTicket({
        eventId,
        userId,
        type,
        price: ticketPrice,
        isValid: true,
    });
    event.attendees.push(userId);
    yield event.save();
    const io = (0, socketServer_1.getIO)();
    io.emit("bookingUpdate", {
        eventId: event._id,
        attendees: event.attendees,
        capacityLeft: event.capacity - event.attendees.length,
    });
    res
        .status(201)
        .json((0, responseBuilder_1.buildSuccessMessage)(200, "Ticket Created Successfully", ticket));
}));
const getBookedTickets = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tickets = yield ticket_service_1.ticketService.getTickets();
    res
        .status(200)
        .json((0, responseBuilder_1.buildSuccessMessage)(200, "Tickets fetched Successfully!", tickets));
    return;
}));
exports.ticketController = {
    bookTicket,
    getBookedTickets,
};
