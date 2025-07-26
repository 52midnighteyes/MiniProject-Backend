import { Request, Response, NextFunction } from "express";
import { z, ZodObject } from "zod";

export default function validate(schema: ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
}
