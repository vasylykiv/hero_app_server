import "dotenv/config";
import express, { json, static as static_, Request, Response, NextFunction } from "express";
import path from "path";

import { pool as db } from "$clientDB/D_client";
import apiRoutes from "./routes/R_basic";

const app = express();
const port = process.env.PORT || 5001;

app.use(json());
app.use(static_(path.join(process.cwd(), "public")));
app.use("/api", apiRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  switch (err.code) {
    case "ENOENT":
      console.error(err);
      return res.status(500).json({ error: "Something went wrong (server side)" });

    case "23502":
      console.error(err);
      return res.status(500).json({ error: "The nickname field cannot be empty" });

    default:
      break;
  }

  res.status(500).json({ error: err.message });
});

process.on("SIGINT", async () => {
  await db.end();
  process.exit(0);
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
