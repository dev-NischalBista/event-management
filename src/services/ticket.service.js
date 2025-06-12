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
exports.ticketService = void 0;
const ticket_model_1 = __importDefault(require("../models/ticket.model"));
class TicketService {
    constructor() { }
    getTickets() {
        return __awaiter(this, void 0, void 0, function* () {
            const tickets = yield ticket_model_1.default.find().sort({ createdAt: -1 }).exec();
            return tickets;
        });
    }
    getTicket(userId, eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield ticket_model_1.default.find({ userId, eventId });
            return ticket;
        });
    }
    bookTicket(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ticket_model_1.default.create(data);
        });
    }
}
exports.ticketService = new TicketService();
