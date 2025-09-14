import path from "path";
import fs from "fs";

function U_createFolder(id: string) {
  const folderPath = path.join(process.cwd(), "public/images", id);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
}

export default U_createFolder;
