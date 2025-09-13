import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!req.filesFolderPath) {
      const userId = uuidv4();
      const folderPath = path.join(process.cwd(), "public/images", userId);

      fs.mkdirSync(folderPath, { recursive: true });
      cb(null, folderPath);

      req.userId = userId;
      req.filesFolderPath = folderPath;
    } else {
      cb(null, req.filesFolderPath);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4();
    cb(null, `${uniqueSuffix}.${file.originalname.split(".")[1]}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

function uploadMiddleware(req: Request, res: Response, next: NextFunction) {
  const middleware = upload.array("images", 5);

  middleware(req, res, (err: any) => {
    if (err instanceof multer.MulterError) return res.status(400).json({ message: "file can be PNG or JPG only, max 5 files, name the field for yor image: 'images'" });

    if (err) return next(err);

    next();
  });
}

export default uploadMiddleware;
