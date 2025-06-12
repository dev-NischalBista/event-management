import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { buildSuccessMessage } from "../../utils/responseBuilder";

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

  res.status(200).json(buildSuccessMessage(200, "Logout Successfull!"));
});

export default logout;
