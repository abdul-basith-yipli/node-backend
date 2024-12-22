import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/userModel";
import { verifyAccessToken } from "../utils/jwt";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ status: "failed", message: "Authentication token is missing." });
  }

  try {
    const decoded = verifyAccessToken(token) as IUser;
    req.user = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      role: decoded.role,
    };
    next();
  } catch (error) {
    res.status(401).json({ status: "failed", error: "Invalid token" });
  }
};
