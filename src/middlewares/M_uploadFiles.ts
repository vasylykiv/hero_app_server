import { Request, Response, NextFunction } from "express";
import multer from "multer";

const storage = multer.memoryStorage();

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

function M_upload(req: Request, res: Response, next: NextFunction) {
  const middleware = upload.array("images", 5);

  middleware(req, res, (err: any) => {
    if (err instanceof multer.MulterError) return res.status(400).json({ message: "file can be PNG or JPG only, max 5 files, name the field for yor image: 'images'" });

    if (err) return next(err);

    next();
  });
}

export default M_upload;
