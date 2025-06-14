import { Request, Response, RequestHandler } from "express";
import { verifyAccessToken } from "../utils/jwt";
import asyncHandler from "../utils/asyncHandler";
import {
  buildErrorMessage,
  buildSuccessMessage,
} from "../utils/responseBuilder";
import { userService } from "../services/user.service";

const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  res.status(200).json(buildSuccessMessage(200, "Users", users));
});

const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies.AccessToken;

  if (!token) {
    res.status(401).json(buildErrorMessage(401, "Access Token Missing"));
    return;
  }

  const decoded = verifyAccessToken(token);

  const userId = decoded?._id;

  if (!userId) {
    res.status(401).json(buildErrorMessage(401, "User not found!"));
    return;
  }

  const user = await userService.getUserById(userId);

  res
    .status(200)
    .json(buildSuccessMessage(200, "User Fetched Successfully!", user));
});

export const userController = {
  getUsers: getUsers as RequestHandler,
  getByUserId: getUserById as RequestHandler,
};
