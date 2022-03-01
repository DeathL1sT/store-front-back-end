import { Request, Response, NextFunction } from "express";

export default function handleError(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(400).json({ error: err.message });

  next(err);
}
