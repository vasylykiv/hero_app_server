import path from "path";

function U_createFilesURL(files: string[], folderName: string): string[] {
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
