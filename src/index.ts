import "dotenv/config";
import express, { json, static as static_, Request, Response, NextFunction } from "express";
import path from "path";
import cors from "cors";

import { pool as db } from "$clientDB/D_client.js";
import apiRoutes from "./routes/R_basic.js";

const app = express();
const port = process.env.PORT || 5001;

app.use(json());
app.use(static_(path.join(process.cwd(), "public")));
app.use(cors());
app.use("/api", apiRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

process.on("SIGINT", async () => {
  await db.end();
  process.exit(0);
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
