import path from "path";
import fs from "fs";

function U_deleteFiles(folderPath: string) {
  try {
    if (fs.existsSync(folderPath)) {
      const storedFiles = fs.readdirSync(folderPath);

      storedFiles.forEach((file) => {
        fs.unlinkSync(path.join(folderPath, file));
      });
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export default U_deleteFiles;
