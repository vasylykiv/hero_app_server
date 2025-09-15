import { Router } from "express";

import C_getData from "$controllers/C_getData.js";
import C_postData from "$controllers/C_postData.js";
import C_putData from "$controllers/C_putData.js";
import C_deleteData from "$controllers/C_deleteData.js";

import M_upload from "$middlewares/M_uploadFiles.js";
import M_checkMultipart from "$middlewares/M_checkMultipart.js";

const router = Router();

router.get("/get_hero", C_getData);
router.post("/add_hero", M_checkMultipart, M_upload, C_postData);
router.put("/change_hero/:id", M_checkMultipart, M_upload, C_putData);
router.delete("/delete_hero/:id", C_deleteData);

export default router;
