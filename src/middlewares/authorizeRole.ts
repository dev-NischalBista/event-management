import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authenticateUser";
import { buildErrorMessage } from "../utils/responseBuilder";

const authorizeRole = (roles: string[]) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    const user = req.user;

    if (!user || !roles.includes(user.role)) {
      res.status(403).json(buildErrorMessage(403, "Forbidden: Access denied"));
      return;
    }

    next();
  };
};

export default authorizeRole;
