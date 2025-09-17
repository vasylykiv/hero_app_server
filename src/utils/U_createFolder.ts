import path from "path";
import fs from "fs";

function U_createFolder(folderPath: string) {
  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
  } catch (error) {
    console.log(error);
  }
}

export default U_createFolder;
