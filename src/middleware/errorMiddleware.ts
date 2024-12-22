import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import logger from "../utils/logger";
import configs from "../config/intex";

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (configs.NODE_ENV === "development") {
    console.error("Error::", err);
  }
  if (!err.statusCode) {
    logger.error({
      message: err.message,
      statusCode: 500,
      stack: err.stack,
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.isOperational
    ? err.message
    : "An unexpected error occurred!.";

  res.status(statusCode).json({
    status: "error",
    message,
    statusCode,
  });
};
