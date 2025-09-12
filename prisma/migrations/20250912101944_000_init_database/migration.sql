-- CreateTable
CREATE TABLE "public"."Hero" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "real_name" TEXT,
    "origin_description" TEXT,
    "superpowers" TEXT,
    "catch_phrase" TEXT,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HeroImages" (
    "id" TEXT NOT NULL,
    "hero_id" TEXT NOT NULL,
    "image_url" TEXT,

    CONSTRAINT "HeroImages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hero_nickname_key" ON "public"."Hero"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "HeroImages_image_url_key" ON "public"."HeroImages"("image_url");

-- AddForeignKey
ALTER TABLE "public"."HeroImages" ADD CONSTRAINT "HeroImages_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "public"."Hero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
