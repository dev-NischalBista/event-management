"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventSchema = void 0;
const zod_1 = require("zod");
exports.eventSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z.string().optional(),
    date: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    registrationStart: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    registrationEnd: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    location: zod_1.z.string().optional(),
    organizer: zod_1.z.string().optional(),
    capacity: zod_1.z.number().optional(),
    pricing: zod_1.z.object({
        standard: zod_1.z.number(),
        premium: zod_1.z.number(),
        vip: zod_1.z.number(),
    }),
});
