import { Request, Response } from "express";

export const notFoundHandler = (req: Request, res: Response): void => {
  res
    .status(404)
    .json({ status: "failed", message: `Route ${req.originalUrl} not found.` });
};
