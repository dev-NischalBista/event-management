import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { signAccessToken, verifyRefreshToken } from "../../utils/jwt";
import {
  buildErrorMessage,
  buildSuccessMessage,
} from "../../utils/responseBuilder";
import { userService } from "../../services/user.service";

const refresh = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.RefreshToken;

  if (!refreshToken) {
    res.status(401).json(buildErrorMessage(401, "Invalid RefreshToken"));
    return;
  }

  const decoded = verifyRefreshToken(refreshToken);

  const user = await userService.getUserById(decoded?._id);

  if (!user) {
    res.status(401).json(buildErrorMessage(401, "User not found!"));
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

  res.status(200).json(buildSuccessMessage(200, "Access Token Refreshed!"));
});

export default refresh;
