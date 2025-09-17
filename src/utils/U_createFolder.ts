import path from "path";
import fs from "fs";

function U_createFolder(folderPath: string) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
}

export default U_createFolder;
