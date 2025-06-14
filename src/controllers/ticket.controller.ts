import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { eventService } from "../services/event.service";
import { getIO } from "../socketServer";
import {
  buildErrorMessage,
  buildSuccessMessage,
} from "../utils/responseBuilder";
import { ticketService } from "../services/ticket.service";

const bookTicket = asyncHandler(async (req: Request, res: Response) => {
  const { eventId } = req.params;
  const { userId, type = "standard" } = req.body;

  const event = await eventService.getEventById(eventId);

  if (!event) {
    res.status(404).json(buildErrorMessage(404, "No Event Found!"));
    return;
  }

  const now = Date.now();

  if (now < event.registrationStart.getTime()) {
    res
      .status(400)
      .json(buildErrorMessage(400, "Registration has not started yet!"));
    return;
  } else if (now > event.registrationEnd.getTime()) {
    res.status(400).json(buildErrorMessage(400, "Registration has ended!"));
    return;
  }

  if (event.attendees.length >= event.capacity) {
    res.status(400).json(buildErrorMessage(400, "Event is fully booked!"));
    return;
  }

  const existingTicket = await ticketService.getTicket(userId, eventId);

  if (existingTicket) {
    res
      .status(400)
      .json(
        buildErrorMessage(
          400,
          "You have already booked a ticket for this event."
        )
      );
    return;
  }

  const pricing = event.pricing as Record<string, number>;
  const ticketPrice = pricing[type];

  if (typeof ticketPrice !== "number") {
    res.status(400).json(buildErrorMessage(400, "Invalid Ticket Type!"));
    return;
  }

  const ticket = await ticketService.bookTicket({
    eventId,
    userId,
    type,
    price: ticketPrice,
    isValid: true,
  });

  event.attendees.push(userId);
  await event.save();

  const io = getIO();
  io.emit("bookingUpdate", {
    eventId: event._id,
    attendees: event.attendees,
    capacityLeft: event.capacity - event.attendees.length,
  });

  res
    .status(201)
    .json(buildSuccessMessage(200, "Ticket Created Successfully", ticket));
});

const getTickets = asyncHandler(async (req: Request, res: Response) => {
  const tickets = await ticketService.getTickets();

  res
    .status(200)
    .json(buildSuccessMessage(200, "Tickets fetched Successfully!", tickets));
  return;
});

const getEventTickets = asyncHandler(async (req: Request, res: Response) => {
  const { eventId } = req.params;

  const tickets = await ticketService.getEventTickets(eventId);

  res
    .status(200)
    .json(buildSuccessMessage(200, "Tickets fetched Successfully!", tickets));
  return;
});

const getUserTickets = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const tickets = await ticketService.getUserTickets(userId);

  res
    .status(200)
    .json(buildSuccessMessage(200, "Tickets fetched Successfully!", tickets));
  return;
});

export const ticketController = {
  bookTicket,
  getTickets,
  getEventTickets,
  getUserTickets,
};
