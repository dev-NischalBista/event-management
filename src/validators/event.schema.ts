import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  registrationStart: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  registrationEnd: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  location: z.string().optional(),
  organizer: z.string().optional(),
  capacity: z.number().optional(),
  pricing: z.object({
    standard: z.number(),
    premium: z.number(),
    vip: z.number(),
  }),
});
