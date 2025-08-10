import { Request, Response, NextFunction } from "express";
import { z, ZodObject } from "zod";

export default function validateQuery(schema: ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.query);
      next();
    } catch (err) {
      next(err);
    }
  };
}
