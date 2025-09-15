import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

import { PoolClient, QueryResult } from "pg";
import { pool as db } from "$clientDB/D_client.js";

import type { ClientData } from "$types/types";

import U_createFolder from "$utils/U_createFolder.js";
import U_createFilesURL from "$utils/U_createFilesURL.js";
import U_copyFiles from "$utils/U_copyFiles.js";

async function postData(req: Request, res: Response, next: NextFunction) {
  const clientData: ClientData = req.body;
  clientData.id = uuidv4();

  const resultData: { query1?: QueryResult<any>; query2?: QueryResult<any> } = {};

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
      [clientData.id, clientData.nickname, clientData.real_name, clientData.origin_description, clientData.superpowers, clientData.catch_phrase]
    );

    resultData.query1 = query1;
    console.log(req.files?.length);

    if (req.files?.length !== 0) {
      const files = req.files as Express.Multer.File[];
      U_createFolder(clientData.id);
      const filesName = U_copyFiles(clientData.id, files);
      const filesNameWithoutExt = filesName.map((file) => file.split(".")[0]);
      const filesURLs = U_createFilesURL(filesName, clientData.id);

      req.files = [];

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
        [clientData.id, filesNameWithoutExt, filesURLs]
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
