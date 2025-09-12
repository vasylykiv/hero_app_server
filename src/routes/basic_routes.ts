import { Router, Request, Response, NextFunction } from "express";
import storageMiddleware from "../middlewares/stotage";
import postData from "src/controllers/postData";

const router = Router();

router.get("", () => {});
router.post("/add_hero", storageMiddleware.single("images"), postData);
router.patch("", () => {});
router.delete("", () => {});

export default router;
