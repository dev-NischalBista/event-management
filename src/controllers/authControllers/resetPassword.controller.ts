import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";

const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  // Placeholder for reset password logic
  res.status(200).json({ message: "Reset password not implemented" });
});

export default resetPassword;
