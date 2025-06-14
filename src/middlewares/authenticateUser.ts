import { Request, Response, NextFunction, RequestHandler } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { buildErrorMessage } from "../utils/responseBuilder";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

const authenticateUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.AccessToken;

  if (!token) {
    return res
      .status(401)
      .json(buildErrorMessage(401, "Access Token Missing!"));
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json(buildErrorMessage(401, "Invalid or expired token"));
  }
};

export default authenticateUser as RequestHandler;
