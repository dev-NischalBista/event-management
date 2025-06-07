import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authenticateUser";

const authorizeRole = (roles: string[]) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    const user = req.user;

    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ message: "Forbidden: Access denied" });
      return;
    }

    next();
  };
};

export default authorizeRole;
