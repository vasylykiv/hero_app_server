import { Request, Response, NextFunction } from "express";

import { PoolClient } from "pg";
import { pool as db } from "$clientDB/D_client.js";

import path from "path";
import fs from "fs";

async function C_deleteData(req: Request, res: Response, next: NextFunction) {
  const id = req.params?.id;
  const folderPath = path.join(process.cwd(), process.env.FILES_FOLDER, id);

  if (!id) return res.status(200).json({ message: "The id parameter in link cannot be empty" });

  let client: PoolClient;
  try {
    client = await db.connect();

    const count = await client.query(
      `
        DELETE FROM "hero" * 
        WHERE id = $1
        
    `,
      [id]
    );

    if (count.rowCount > 0 && fs.existsSync(folderPath)) fs.rmSync(folderPath, { recursive: true, force: true });

    res.status(200).json({ message: "Delete success" });
  } catch (error) {
    return next(error);
  } finally {
    client.release();
  }
}

export default C_deleteData;
