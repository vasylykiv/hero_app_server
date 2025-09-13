import { Router, Request, Response, NextFunction } from "express";
import multer from "multer";

import C_postData from "$controllers/C_postData";

import M_validateEmptyData from "$middlewares/M_validateEmptyData";
import M_upload from "$middlewares/M_uploadFiles";
import M_checkMultipart from "$middlewares/M_checkRequestContentType";

const router = Router();

router.get("", () => {});
router.delete("", () => {});
router.post("/add_hero", M_checkMultipart, M_upload, M_validateEmptyData, C_postData);
router.patch("", () => {});

export default router;
