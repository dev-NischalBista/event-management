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
exports.eventController = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const event_service_1 = require("../services/event.service");
const responseBuilder_1 = require("../utils/responseBuilder");
const getEvents = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield event_service_1.eventService.getEvents();
    res
        .status(200)
        .json((0, responseBuilder_1.buildSuccessMessage)(200, "Event Fetched Successfully!", events));
}));
const addEvent = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const existingEvent = yield event_service_1.eventService.getEventByTitle(title);
    if (existingEvent) {
        res.status(400).json((0, responseBuilder_1.buildErrorMessage)(400, "Event already Exists!"));
        return;
    }
    const newEvent = yield event_service_1.eventService.addEvent(req.body);
    yield newEvent.save();
    res
        .status(201)
        .json((0, responseBuilder_1.buildSuccessMessage)(201, "Event Added successfully!", newEvent));
}));
exports.eventController = {
    getEvents,
    addEvent,
};
