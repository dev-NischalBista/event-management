import { NextFunction, Request, Response } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
    error: err.message || "An unexpected error occurred",
    // error: process.env.NODE_ENV === "development" ? err : {},
  });
};

export default errorHandler;
