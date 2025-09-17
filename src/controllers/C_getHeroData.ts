import { Request, Response, NextFunction } from "express";

import U_checkImagesExists from "$utils/U_checkImagesExists.js";

import { PoolClient, QueryResult } from "pg";
import { pool as db } from "$clientDB/D_client.js";

async function C_getHeroData(req: Request, res: Response, next: NextFunction) {
  const heroId: string = req.params.id;

  if (!heroId || heroId === "") return res.status(200).json({ message: "Error: wrong id" });

  let client: PoolClient;
  try {
    client = await db.connect();
    const queryData = {
      queryText: `
        SELECT 
          hero.*,
          COALESCE(
            json_agg( 
              hero_images.image_url 
            ), '[]') as images_url
        FROM hero 
        LEFT JOIN hero_images ON hero.id = hero_images.hero_id 
        WHERE hero.id = $1
        GROUP BY hero.id 
        ORDER BY hero.id ASC 
    `,
      queryDependencies: [heroId],
    };
    const result = await client.query(queryData.queryText, queryData.queryDependencies);

    // this for filter hero images, if hero images folder dont exist or empty but hero has record about images, we clean images field for hero
    await U_checkImagesExists(result, client, "single");
    const cleanedResult = await client.query(queryData.queryText, queryData.queryDependencies);

    res.status(200).json({ message: "Success", data: cleanedResult.rows[0] });
  } catch (error) {
    console.error(error);
    next(error);
  } finally {
    client.release();
  }
}

export default C_getHeroData;
