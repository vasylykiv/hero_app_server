import { Request, Response, NextFunction } from "express";
import { PoolClient, QueryResult } from "pg";
import { pool as db } from "$clientDB/D_client";

async function C_getData(req: Request, res: Response, next: NextFunction) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

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
        GROUP BY hero.id 
        ORDER BY hero.id ASC 
        LIMIT $1 
        OFFSET $2
    `,
      [limit, offset]
    );

    const allHeroes = await client.query("SELECT COUNT(*) FROM hero");
    const totalHeroes = parseInt(allHeroes.rows[0].count, 10);
    const totalPages = Math.ceil(totalHeroes / limit);

    res.status(200).json({ message: "Success", page, limit, totalHeroes, totalPages, data: result.rows });
  } catch (error) {
    console.error(error);
    next(error);
  } finally {
    client.release();
  }
}

export default C_getData;
