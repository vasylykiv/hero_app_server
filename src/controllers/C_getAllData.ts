import { Request, Response, NextFunction } from "express";

import { PoolClient } from "pg";
import { pool as db } from "$clientDB/D_client.js";

import U_checkImagesExists from "$utils/U_checkImagesExists.js";

async function C_getData(req: Request, res: Response, next: NextFunction) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  let client: PoolClient;
  try {
    client = await db.connect();
    const queryData = {
      queryText: `
        SELECT 
          hero.id,
          hero.nickname, 
          hero.real_name,
          hero.origin_description,
          COALESCE(image_url, '') AS image_url
        FROM hero 
        LEFT JOIN LATERAL (
          SELECT image_url
          FROM hero_images
          WHERE hero_id = hero.id
          ORDER BY id ASC
          LIMIT 1
        ) AS hero_image ON true
        ORDER BY hero.id ASC 
        LIMIT $1 
        OFFSET $2
    `,
      queryDependencies: [limit, offset],
    };
    const result = await client.query(queryData.queryText, queryData.queryDependencies);

    // this for filter hero images, if hero images folder dont exist or empty but hero has record about images, we clean images field for hero
    await U_checkImagesExists(result, client, "list");
    const cleanedResult = await client.query(queryData.queryText, queryData.queryDependencies);

    const allHeroes = await client.query("SELECT COUNT(*) FROM hero");
    const totalHeroes = parseInt(allHeroes.rows[0].count, 10);
    const totalPages = Math.ceil(totalHeroes / limit);

    res.status(200).json({ message: "Success", page, limit, totalHeroes, totalPages, data: cleanedResult.rows });
  } catch (error) {
    console.error(error);
    next(error);
  } finally {
    client.release();
  }
}

export default C_getData;
