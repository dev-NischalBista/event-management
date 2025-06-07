import { NextFunction, Request, RequestHandler, Response } from "express";
import User from "../models/user.model";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";
import asyncHandler from "../utils/asyncHandler";

const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const newUser = new User(req.body);

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  }
);

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    res.status(401).json({ message: "Invalid Email!" });
    return;
  }

  const isPasswordValid = await existingUser.comparePassword(password);

  if (!isPasswordValid) {
    res.status(401).json({ message: "Invalid Password!" });
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
    // secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 15 * 1000,
  });

  res.cookie("RefreshToken", refreshToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days
  });

  res.status(200).json({
    message: "Login successfull",
    user: {
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
      token: token,
    },
  });
});

const refresh = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.RefreshToken;

  if (!refreshToken) {
    res.status(401).json({ message: "Refresh token missing" });
    return;
  }

  const decoded = verifyRefreshToken(refreshToken);

  const user = await User.findById(decoded._id);

  if (!user) {
    res.status(401).json({ message: "User not found" });
    return;
  }

  const newAccessToken = signAccessToken({
    _id: user._id,
    email: user.email,
    role: user.role,
  });

  res.cookie("AccessToken", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.status(200).json({ message: "Access token refreshed" });
});

const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("AccessToken", {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  res.clearCookie("RefreshToken", {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  res.status(200).json({ message: "Logout successful" });
});

const emailVerification = asyncHandler(async (req: Request, res: Response) => {
  // Placeholder for email verification logic
  res.status(200).json({ message: "Email verification not implemented" });
});

const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  // Placeholder for reset password logic
  res.status(200).json({ message: "Reset password not implemented" });
});

export const authController = {
  register: register as RequestHandler,
  login: login as RequestHandler,
  logout: logout as RequestHandler,
  refresh: refresh as RequestHandler,
  emailVerification: emailVerification as RequestHandler,
  resetPassword: resetPassword as RequestHandler,
};
