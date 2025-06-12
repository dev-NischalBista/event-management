"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ticketSchema = new mongoose_1.Schema({
    eventId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: String,
        enum: ["standard", "premium", "vip"],
        default: "standard",
    },
    price: {
        type: Number,
        required: true,
    },
    seatNo: {
        type: String,
        required: false,
    },
    isValid: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
const Ticket = (0, mongoose_1.model)("Ticket", ticketSchema);
exports.default = Ticket;
