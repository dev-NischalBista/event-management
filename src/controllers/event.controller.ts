import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { eventService } from "../services/event.service";

const getEvents = asyncHandler(async (req: Request, res: Response) => {
  const events = await eventService.fetchAllEvents();
  res.status(200).json({
    message: "Events fetched successfully",
    data: events,
  });
});

const addEvent = asyncHandler(async (req: Request, res: Response) => {
  const { title } = req.body;

  const existingEvent = await eventService.findEventByTitle(title);

  if (existingEvent) {
    res.status(400).json({
      message: "Event with this title already exists",
    });
    return;
  }

  const newEvent = await eventService.createEvent(req.body);
  res.status(201).json({
    message: "Event created successfully",
    data: newEvent,
  });
});

export const eventController = {
  getEvents,
  addEvent,
};
