import { PoolClient, QueryResult } from "pg";
import { pool as db } from "$clientDB/D_client.js";
import { Request, Response, NextFunction } from "express";
import path from "path";

import U_createFilesURL from "$utils/U_createFilesURL.js";
import U_copyFiles from "$utils/U_copyFiles.js";
import U_deleteFiles from "$utils/U_deleteFiles.js";

import type { ClientData } from "$types/types";

async function C_putData(req: Request, res: Response, next: NextFunction) {
  const clientData: ClientData = req.body;
  const id = req.params?.id;
  const action = req.query?.action;
  const files = req.files as Express.Multer.File[];

  if (!id) return res.status(200).json({ message: "The id parameter in link cannot be empty" });

  let client: PoolClient;
  try {
    client = await db.connect();

    await client.query("BEGIN");
    await client.query(
      `
      UPDATE "hero" 
      SET
          nickname = $2, 
          real_name = $3, 
          origin_description = $4, 
          superpowers = $5, 
          catch_phrase = $6
      WHERE id = $1
      RETURNING *;
    `,
      [id, clientData.nickname, clientData.real_name, clientData.origin_description, clientData.superpowers, clientData.catch_phrase]
    );

    const folderPath = path.join(process.cwd(), "public/images", id);

    if (action === "change" && files?.length > 0) {
      U_deleteFiles(folderPath);

      await client.query(
        `
        DELETE FROM "hero_images" *
        WHERE hero_id = $1
      `,
        [id]
      );

      const filesName = U_copyFiles(folderPath, files);
      const filesNameWithoutExt = filesName.map((file) => file.split(".")[0]);
      const filesURLs = U_createFilesURL(filesName, id);

      console.log(filesURLs);

      req.files = [];

      await client.query(
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
    } else if (action === "delete" && (!files || files?.length === 0)) {
      U_deleteFiles(folderPath);

      await client.query(
        `
        DELETE FROM "hero_images" *
        WHERE hero_id = $1
      `,
        [id]
      );
    }

    await client.query("COMMIT");

    res.status(200).json({ message: "Success change hero data" });
  } catch (error) {
    await client.query("ROLLBACK");
    return next(error);
  } finally {
    client.release();
  }
}

export default C_putData;
