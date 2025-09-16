import { Request, Response, NextFunction } from "express";

import { PoolClient, QueryResult } from "pg";
import { pool as db } from "$clientDB/D_client.js";

async function C_getHeroData(req: Request, res: Response, next: NextFunction) {
  const heroId: string = req.params.id;

  if (!heroId || heroId === "") return res.status(200).json({ message: "Error: wrong id" });

  let client: PoolClient;
  try {
    client = await db.connect();
    const result = await client.query(
      `
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
      [heroId]
    );

    res.status(200).json({ message: "Success", data: result.rows[0] });
  } catch (error) {
    console.error(error);
    next(error);
  } finally {
    client.release();
  }
}

export default C_getHeroData;
