import { promises as fs } from "fs";
import path from "path";

import { PoolClient } from "pg";

type HeroData = {
  id: string;
  images: string | string[];
};

async function U_checkImagesExists(data: { rows: any[] }, client: PoolClient, method: "list" | "single") {
  const heroes: HeroData[] = data.rows.map((hero) => ({
    id: hero.id,
    images: method === "list" ? hero.image_url : hero.images_url,
  }));

  if (heroes.length === 0) {
    return;
  }

  const publicPath = path.join(process.cwd(), "public", "images");

  const singleImagesToDelete: string[] = [];
  const manyImagesToDelete: string[] = [];

  try {
    await Promise.all(
      heroes.map(async (hero) => {
        const heroImagesPath = path.join(publicPath, hero.id);
        const hasImagesURLsInDB = Array.isArray(hero.images) ? hero.images.length > 0 : hero.images.trim().length > 0;

        if (!hasImagesURLsInDB) {
          return;
        }

        try {
          const imagesFromFolder = await fs.readdir(heroImagesPath);

          if (method === "list" && imagesFromFolder.length === 0) {
            singleImagesToDelete.push(hero.id);
            return;
          }

          if (method === "single" && Array.isArray(hero.images)) {
            for (const imageUrl of hero.images) {
              const imageName = path.basename(imageUrl);
              if (!imagesFromFolder.includes(imageName)) {
                manyImagesToDelete.push(imageUrl);
              }
            }
          }
        } catch (error: any) {
          if (error.code === "ENOENT") {
            singleImagesToDelete.push(hero.id);
          } else {
            console.error(error);
          }
        }
      })
    );

    // Deleting

    if (singleImagesToDelete.length > 0) {
      await client.query(
        `
          DELETE FROM hero_images
          WHERE hero_id = ANY($1::uuid[])
        `,
        [singleImagesToDelete]
      );
    }

    if (manyImagesToDelete.length > 0) {
      await client.query(
        `
          DELETE FROM hero_images
          WHERE image_url = ANY($1::text[])
        `,
        [manyImagesToDelete]
      );
    }
  } catch (error) {
    console.error(error);
  }
}

export default U_checkImagesExists;
