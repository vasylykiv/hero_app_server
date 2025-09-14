import { v4 as uuidv4 } from "uuid";

import type { ClientFileType } from "$types/types";

import path from "path";
import fs from "fs";

function U_copyFiles(parentFolderName: string, files: Express.Multer.File[]): string[] {
  const filesArr = [];
  try {
    files.forEach((file) => {
      const filename = uuidv4() + path.extname(file.originalname);
      const fileDestination = path.join(process.cwd(), process.env.FILES_FOLDER!, parentFolderName, filename);

      fs.writeFileSync(fileDestination, file.buffer);
      filesArr.push(filename);
    });
  } catch (error) {
    throw new Error(error);
  }

  return filesArr;
}

export default U_copyFiles;
