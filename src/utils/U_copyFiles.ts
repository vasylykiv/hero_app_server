import path from "path";
import fs from "fs";

import { v4 as uuidv4 } from "uuid";

function U_copyFiles(parentFolderPath: string, files: Express.Multer.File[]): string[] {
  const filesArr = [];

  try {
    files.forEach((file) => {
      const filename = uuidv4() + path.extname(file.originalname);
      const fileDestination = path.join(parentFolderPath, filename);

      if (!fs.existsSync(parentFolderPath)) fs.mkdirSync(parentFolderPath, { recursive: true });

      fs.writeFileSync(fileDestination, file.buffer, {});
      filesArr.push(filename);
    });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }

  return filesArr;
}

export default U_copyFiles;
