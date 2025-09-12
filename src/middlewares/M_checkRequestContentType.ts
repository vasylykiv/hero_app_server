import { Request, Response, NextFunction } from "express";

function checkMultipart(req: Request, res: Response, next: NextFunction) {
  const contentType = req.headers["content-type"];

  if (!contentType || !contentType.startsWith("multipart/form-data")) {
    return res.status(400).json({ error: "The data you submitted is not'multipart/form-data' content type or empty" });
  }

  next();
}

export default checkMultipart;
