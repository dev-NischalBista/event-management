import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import User from "../../models/user.model";
import { signAccessToken, signRefreshToken } from "../../utils/jwt";
import {
  buildErrorMessage,
  buildSuccessMessage,
} from "../../utils/responseBuilder";
import { userService } from "../../services/user.service";

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await userService.getUserByEmail(email);

  if (!existingUser) {
    res.status(400).json(buildErrorMessage(400, "Invalid E-mail!"));
    return;
  }

  const isPasswordValid = await existingUser.comparePassword(password);

  if (!isPasswordValid) {
    res.status(401).json(buildErrorMessage(401, "Invalid Password!"));
    return;
  }

  const token = signAccessToken({
    _id: existingUser._id,
    email: existingUser.email,
    role: existingUser.role,
  });

  const refreshToken = signRefreshToken({
    _id: existingUser._id,
    email: existingUser.email,
    role: existingUser.role,
  });

  res.cookie("AccessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 15 * 1000,
  });

  res.cookie("RefreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days
  });

  res.status(200).json(
    buildSuccessMessage(200, "Login Successfull!", {
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
      token: token,
    })
  );
});

export default login;
