import "dotenv/config";
import express, { json, static as static_, Request, Response } from "express";
import path from "path";
import apiRoutes from "./routes/basic_routes";

const app = express();
const port = process.env.PORT || 5001;

app.use(json());
app.use(static_(path.join(process.cwd(), "public")));
app.use("/api", apiRoutes);

app.use((err: Error, req: Request, res: Response) => {
  console.error(err.message);
  res.status(500).send(err.message);
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
