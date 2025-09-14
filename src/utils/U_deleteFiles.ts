import { Request, NextFunction } from "express";
import path from "path";
import fs from "fs";

function U_deleteFiles(id: string) {
  const folderPath = path.join(process.cwd(), "public/images", id);
  try {
    if (fs.existsSync(folderPath)) {
      const storedFiles = fs.readdirSync(folderPath);

      storedFiles.forEach((file) => {
        fs.unlinkSync(path.join(folderPath, file));
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export default U_deleteFiles;
