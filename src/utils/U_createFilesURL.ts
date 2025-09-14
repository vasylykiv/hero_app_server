import { v4 as uuidv4 } from "uuid";

import path from "path";
import fs from "fs";

import type { ClientFileType } from "$types/types.ts";

function U_createFilesURL(files: string[], folderName: string): ClientFileType[] {
  const filesURLs = [];

  try {
    files.forEach((file) => {
      filesURLs.push(path.join(process.env.URL, `${process.env.PUBLIC_IMAGES_FOLDER}/`, folderName, file));
    });
  } catch (error) {
    throw new Error(error);
  }

  return filesURLs;
}

export default U_createFilesURL;
