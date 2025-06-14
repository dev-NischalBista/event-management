import { z } from "zod";

export const ticketSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  type: z.enum(["standard", "premium", "vip"]).default("standard"),
  seatNo: z.string().optional(),
});

export const getEventTicketSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),
});
