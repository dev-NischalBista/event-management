import { Router } from "express";
import authenticateUser from "../middlewares/authenticateUser";
import { ticketController } from "../controllers/ticket.controller";
import authorizeRole from "../middlewares/authorizeRole";
import validate from "../middlewares/validate";
import { ticketSchema } from "../validators/ticket.schema";

const ticketRouter = Router();

ticketRouter.post(
  "/:eventId/book",
  validate(ticketSchema),
  authenticateUser,
  ticketController.bookTicket
);

ticketRouter.get(
  "/event/:eventId",
  authenticateUser,
  authorizeRole(["admin"]),
  ticketController.getEventTickets
);

ticketRouter.get(
  "/user/:userId",
  authenticateUser,
  authorizeRole(["admin"]),
  ticketController.getUserTickets
);

ticketRouter.get(
  "/booked-tickets",
  authenticateUser,
  authorizeRole(["admin"]),
  ticketController.getTickets
);

export default ticketRouter;
