import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export function middleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"] ?? "";

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    //@ts-ignore
    req.userId = decoded.userId;
    next();
  } catch (e) {
    res.status(403).json({
      message: "Unauthorized",
    });
  }
}
