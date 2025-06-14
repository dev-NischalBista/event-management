import { Router } from "express";
import authenticateUser from "../middlewares/authenticateUser";
import { eventController } from "../controllers/event.controller";
import authorizeRole from "../middlewares/authorizeRole";
import validate from "../middlewares/validate";
import { eventSchema } from "../validators/event.schema";

const eventRouter = Router();

eventRouter.get("/all", authenticateUser, eventController.getEvents);

eventRouter.post(
  "/new",
  validate(eventSchema),
  authenticateUser,
  authorizeRole(["admin"]),
  eventController.addEvent
);

export default eventRouter;
