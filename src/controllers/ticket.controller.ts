import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { eventService } from "../services/event.service";
import { getIO } from "../socketServer";
import Ticket from "../models/ticket.model";
import { ticketService } from "../services/ticket.service";

const bookTicket = asyncHandler(async (req: Request, res: Response) => {
  const { eventId } = req.params;
  const { userId, type = "standard" } = req.body;

  const event = await eventService.findEventById(eventId);

  if (!event) {
    res.status(404).json({ message: "No event found!" });
    return;
  }

  const now = Date.now();

  if (now < event.registrationStart.getTime()) {
    res.status(400).json({ message: "Registration has not started yet." });
    return;
  } else if (now > event.registrationEnd.getTime()) {
    res.status(400).json({ message: "Registration has ended." });
    return;
  }

  if (event.attendees.length >= event.capacity) {
    res.status(400).json({ message: "Event is fully Booked!" });
    return;
  }

  const existingTicket = await Ticket.findOne({ userId, eventId });

  if (existingTicket) {
    res
      .status(400)
      .json({ message: "You have already booked a ticket for this event." });
    return;
  }

  const pricing = event.pricing as Record<string, number>;
  const ticketPrice = pricing[type];

  if (typeof ticketPrice !== "number") {
    res.status(400).json({ message: "Invalid ticket type" });
    return;
  }

  const ticket = await Ticket.create({
    userId,
    eventId,
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

  res.status(201).json({
    message: "Ticket booked successfully",
    ticket,
  });
});

const getUserTickets = asyncHandler(async (req: Request, res: Response) => {});

const getBookedTickets = asyncHandler(async (req: Request, res: Response) => {
  const tickets = await ticketService.getAllTickets();

  res.status(200).json({
    message: "Tickets fetched Successfully",
    tickets: tickets,
  });
  return;
});

export const ticketController = {
  bookTicket,
  getBookedTickets,
};
