import configs from "../config/intex";
import jwt from "jsonwebtoken";

const JWT_ACCESS_TOKEN_SECRET = configs.ACCESS_TOKEN_SECRET;
const JWT_REFRESH_TOKEN_SECRET = configs.REFRESH_TOKEN_SECRET;
const JWT_ACCESS_EXPIRATION_TIME = configs.JWT_ACCESS_EXPIRATION_TIME;
const JWT_REFRESH_EXPIRATION_TIME = configs.JWT_REFRESH_EXPIRATION_TIME;

export const generateAccessToken = (
  payload: Record<string, unknown>
): string => {
  return jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRATION_TIME,
  });
};

export const generateRefreshToken = (
  payload: Record<string, unknown>
): string => {
  return jwt.sign(payload, JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRATION_TIME,
  });
};

export const verifyAccessToken = (token: string): any => {
  return jwt.verify(token, JWT_ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (token: string): any => {
  return jwt.verify(token, JWT_REFRESH_TOKEN_SECRET);
};
