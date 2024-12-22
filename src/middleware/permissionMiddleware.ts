import { NextFunction, Request, Response } from "express";
import { rolePermissions } from "../config/permissions";
import { IUser } from "../models/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: Partial<IUser>;
    }
  }
}

export const authorizePermission = (requiredPermission: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user as IUser;

    if (!user || !rolePermissions[user.role]?.includes(requiredPermission)) {
      res
        .status(403)
        .json({ status: "failed", message: "Insufficient permissions." });
      return;
    }

    next();
  };
};
