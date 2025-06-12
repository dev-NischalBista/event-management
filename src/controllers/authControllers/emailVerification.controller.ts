import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";

const emailVerification = asyncHandler(async (req: Request, res: Response) => {
  // Placeholder for email verification logic
  res.status(200).json({ message: "Email verification not implemented" });
});

export default emailVerification;
