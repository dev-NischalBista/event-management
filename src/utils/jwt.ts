import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export const signAccessToken = (
  payload: Object,
  expiresIn: number = 15 * 60 * 1000
) => {
  return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn });
};

export const signRefreshToken = (
  payload: Object,
  expiresIn = 15 * 60 * 1000
) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn });
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_ACCESS_SECRET) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_REFRESH_SECRET) as JwtPayload;
};
