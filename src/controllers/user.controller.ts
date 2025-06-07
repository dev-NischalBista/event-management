import { Request, Response, RequestHandler } from "express";
import User from "../models/user.model";
import { verifyAccessToken } from "../utils/jwt";
import asyncHandler from "../utils/asyncHandler";

const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({}, "-password -__v").sort({ createdAt: -1 });
  res.status(200).json(users);
});

const getByUserId = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies.AccessToken;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const decoded = verifyAccessToken(token);

  const userId = decoded?._id;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const user = await User.findById(userId, "-password -__v");

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json({ message: "User Details", user: user });
});

export const userController = {
  getUsers: getUsers as RequestHandler,
  getByUserId: getByUserId as RequestHandler,
};
