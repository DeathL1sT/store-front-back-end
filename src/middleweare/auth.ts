import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default function auth(req: Request, res: Response, next: NextFunction) {
  //get token from header
  const token = req.header("x-auth-token");

  // check if no token
  if (!token) {
    return res.status(401).json({ msg: "access denaied, no token" });
  }
  // verify the token
  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET_TOKEN as string
    ) as JwtPayload;
    res.locals.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ msg: "token not valid" });
  }
}
