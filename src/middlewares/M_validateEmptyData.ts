import { Request, Response, NextFunction } from "express";
import type { ClientData } from "$types/types";

function validateStringData(req: Request, res: Response, next: NextFunction) {
  const data: ClientData = req.body;
  const filteredData: Partial<ClientData> = {};

  for (const key in data) {
    const value = data[key]?.trim();

    if (typeof value === "string" && value === "") continue;

    filteredData[key] = value;
  }

  req.body = filteredData;
  next();
}

export default validateStringData;
