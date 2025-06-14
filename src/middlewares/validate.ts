import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { buildErrorMessage } from "../utils/responseBuilder";

const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;

      res.status(400).json(buildErrorMessage(400, "Validation failed", errors));
      return;
    }

    req.body = result.data;
    next();
  };

export default validate;
