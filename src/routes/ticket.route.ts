import { Router } from "express";
import authenticateUser from "../middlewares/authenticateUser";
import { ticketController } from "../controllers/ticket.controller";
import authorizeRole from "../middlewares/authorizeRole";

const ticketRouter = Router();

ticketRouter.post(
  "/tickets/:eventId/getTicket",
  authenticateUser,
  ticketController.bookTicket
);

ticketRouter.get(
  "/tickets",
  authenticateUser,
  authorizeRole(["admin"]),
  ticketController.getBookedTickets
);

export default ticketRouter;
