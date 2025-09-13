import path from "path";
import fs from "fs";

import { PoolClient, QueryResult } from "pg";
import { pool as db } from "$clientDB/D_client";
import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import type { ClientData } from "$types/types";

async function postData(req: Request, res: Response, next: NextFunction) {
  const clientData = req.body as Partial<ClientData>;
  const resultData: { query1?: QueryResult<any>; query2?: QueryResult<any> } = {};
  const userId = req.userId ? req.userId : uuidv4();

  let client: PoolClient;
  try {
    client = await db.connect();

    await client.query("BEGIN");
    const query1 = await client.query(
      `
      INSERT INTO "hero" (id, nickname, real_name, origin_description, superpowers, catch_phrase)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `,
      [userId, clientData.nickname, clientData.real_name, clientData.origin_description, clientData.superpowers, clientData.catch_phrase]
    );

    resultData.query1 = query1;

    if (req.files?.length !== 0) {
      const filesPath = fs.readdirSync(req.filesFolderPath, { withFileTypes: true, recursive: true }).map((item) => {
        return path.join(process.env.URL, "images/", req.userId, item.name);
      });
      const filesId = filesPath.map((item) => path.basename(item, path.extname(item)));

      const query2 = await client.query(
        `
        INSERT INTO "hero_images" (id, hero_id, image_url)
        SELECT
          unnested_data.image_id,
          $1,
          unnested_data.image_link
        FROM
          unnest($2::uuid[], $3::text[]) AS unnested_data(image_id, image_link)
        RETURNING *
      `,
        [userId, filesId, filesPath]
      );

      resultData.query2 = query2;
    }

    await client.query("COMMIT");

    res.status(200).json({ message: "Success", data: resultData.query1.rows[0], images: resultData.query2?.rows });
  } catch (error) {
    await client.query("ROLLBACK");
    return next(error);
  } finally {
    client.release();
  }
}

export default postData;
