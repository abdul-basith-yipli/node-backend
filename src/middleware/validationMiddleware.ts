import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export const validateBody = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): any => {
    const { error } = schema.validate(req.body);

    if (error) {
      const errorMessage = error.details.map((detail) => detail.message);
      return res.status(400).json({
        status: "failed",
        message: "ValidationError",
        details: errorMessage,
      });
    }

    next();
  };
};
