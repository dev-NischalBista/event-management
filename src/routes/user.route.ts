import { Router } from "express";
import { userController } from "../controllers/user.controller";
import authenticateUser from "../middlewares/authenticateUser";
import authorizeRole from "../middlewares/authorizeRole";

const userRouter = Router();

userRouter.get(
  "/all",
  authenticateUser,
  authorizeRole(["admin"]),
  userController.getUsers
);

userRouter.get(
  "/me",
  authenticateUser,
  authorizeRole(["admin", "user"]),
  userController.getByUserId
);

export default userRouter;
