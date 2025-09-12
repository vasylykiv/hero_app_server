import { Request, Response, NextFunction } from "express";

const postData = (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;

  res.status(200).json({ message: "Success", data: data });
};

export default postData;
