function U_createFilesURL(files: string[], folderName: string): string[] {
  const filesURLs = [];

  try {
    files.forEach((file) => {
      filesURLs.push(`${process.env.URL}/${process.env.PUBLIC_IMAGES_FOLDER}/${folderName}/${file}`);
    });
  } catch (error) {
    console.error(error);
  }

  return filesURLs;
}

export default U_createFilesURL;
