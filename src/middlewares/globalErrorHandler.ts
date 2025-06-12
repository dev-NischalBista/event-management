import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import { buildErrorMessage } from "../utils/responseBuilder";

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  console.log(err.stack);

  res.status(statusCode).json(
    buildErrorMessage(statusCode, err.message, {
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    })
  );
};
