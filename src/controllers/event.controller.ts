import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { eventService } from "../services/event.service";
import {
  buildErrorMessage,
  buildSuccessMessage,
} from "../utils/responseBuilder";

const getEvents = asyncHandler(async (req: Request, res: Response) => {
  const events = await eventService.getEvents();
  res
    .status(200)
    .json(buildSuccessMessage(200, "Event Fetched Successfully!", events));
});

const addEvent = asyncHandler(async (req: Request, res: Response) => {
  const { title } = req.body;

  const existingEvent = await eventService.getEventByTitle(title);

  if (existingEvent) {
    res.status(400).json(buildErrorMessage(400, "Event already Exists!"));
    return;
  }

  const newEvent = await eventService.addEvent(req.body);
  await newEvent.save();

  res
    .status(201)
    .json(buildSuccessMessage(201, "Event Added successfully!", newEvent));
});

export const eventController = {
  getEvents,
  addEvent,
};
