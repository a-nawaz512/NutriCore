import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";

export const validateRequest =
  (schema: ZodObject<any>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      // Parse only req.body (flat) instead of wrapping in body/params/query
      const parsed = schema.parse(req.body);

      // Attach validated data
      (req as any).validated = parsed;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next({
          statusCode: 400,
          message: "Validation failed",
          errors: error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }

      next(error);
    }
  };