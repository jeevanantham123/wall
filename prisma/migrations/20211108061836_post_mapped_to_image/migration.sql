/*
  Warnings:

  - A unique constraint covering the columns `[postId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "postId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Image_postId_unique" ON "Image"("postId");

-- AddForeignKey
ALTER TABLE "Image" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
