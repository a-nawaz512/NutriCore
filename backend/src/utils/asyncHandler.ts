import { Request, Response, NextFunction } from "express";

// This wrapper takes your async controller function, executes it, 
// and catches any errors, passing them to next()
export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};