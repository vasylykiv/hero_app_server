import { PoolClient, QueryResult } from "pg";
import { pool as db } from "$clientDB/D_client";
import { Request, Response, NextFunction } from "express";
import type { ClientData } from "$types/types";

import U_createFilesURL from "$utils/U_createFilesURL";
import U_copyFiles from "$utils/U_copyFiles";
import U_deleteFiles from "$utils/U_deleteFiles";

async function C_patchData(req: Request, res: Response, next: NextFunction) {
  const clientData: ClientData = req.body;
  const id = req.params?.id;
  const resultData: { query1?: QueryResult<any>; query2?: QueryResult<any> } = {};

  if (!id) return res.status(200).json({ message: "The id parameter in link cannot be empty" });

  let client: PoolClient;
  try {
    client = await db.connect();

    await client.query("BEGIN");
    const query1 = await client.query(
      `
      UPDATE "hero" 
      SET
          nickname = COALESCE(NULLIF($2, ''), nickname), 
          real_name = COALESCE(NULLIF($3, ''), real_name), 
          origin_description = COALESCE(NULLIF($4, ''), origin_description), 
          superpowers = COALESCE(NULLIF($5, ''), superpowers), 
          catch_phrase = COALESCE(NULLIF($6, ''), catch_phrase)
      WHERE id = $1
      RETURNING *;
    `,
      [id, clientData.nickname, clientData.real_name, clientData.origin_description, clientData.superpowers, clientData.catch_phrase]
    );

    resultData.query1 = query1;

    if (req.files?.length !== 0) {
      const files = req.files as Express.Multer.File[];

      U_deleteFiles(id);
      const filesName = U_copyFiles(id, files);
      const filesNameWithoutExt = filesName.map((file) => file.split(".")[0]);
      const filesURLs = U_createFilesURL(filesName, id);

      req.files = [];

      await client.query(
        `
        DELETE FROM "hero_images" *
        WHERE hero_id = $1
      `,
        [id]
      );

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
        [id, filesNameWithoutExt, filesURLs]
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

export default C_patchData;
