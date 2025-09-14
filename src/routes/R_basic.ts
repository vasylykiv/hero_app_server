import { Router, Request, Response, NextFunction } from "express";

import C_getData from "$controllers/C_getData";
import C_postData from "$controllers/C_postData";
import C_patchData from "$controllers/C_patchData";
import C_deleteData from "$controllers/C_deleteData";

import M_upload from "$middlewares/M_uploadFiles";
import M_checkMultipart from "$middlewares/M_checkMultipart";

const router = Router();

router.get("/get_hero", C_getData);
router.post("/add_hero", M_checkMultipart, M_upload, C_postData);
router.patch("/change_hero/:id", M_checkMultipart, M_upload, C_patchData);
router.delete("/delete_hero/:id", C_deleteData);

export default router;
