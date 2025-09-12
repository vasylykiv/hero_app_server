import "dotenv/config";
import express, { json, static as static_ } from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 5001;

app.use(json());
app.use(static_(path.join(process.cwd(), "public")));

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
