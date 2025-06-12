import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import User from "../../models/user.model";
import { userService } from "../../services/user.service";
import {
  buildErrorMessage,
  buildSuccessMessage,
} from "../../utils/responseBuilder";

const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const existingUser = await userService.getUserByEmail(email);

    if (existingUser) {
      res.status(400).json(buildErrorMessage(400, "User already Exists!"));
      return;
    }

    const newUser = await userService.addUser(req.body);

    await newUser.save();

    res
      .status(201)
      .json(buildSuccessMessage(201, "User added successfully!", newUser));
  }
);

export default register;
