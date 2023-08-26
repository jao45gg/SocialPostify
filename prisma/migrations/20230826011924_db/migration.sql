-- CreateTable
CREATE TABLE "media" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "username" VARCHAR NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "text" VARCHAR NOT NULL,
    "image" VARCHAR,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publications" (
    "id" SERIAL NOT NULL,
    "mediaid" INTEGER NOT NULL,
    "postid" INTEGER NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "publications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_title_username" ON "media"("title", "username");

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_mediaid_fkey" FOREIGN KEY ("mediaid") REFERENCES "media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_postid_fkey" FOREIGN KEY ("postid") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
