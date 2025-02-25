/*
  Warnings:

  - You are about to drop the column `popups` on the `Masterclass` table. All the data in the column will be lost.
  - You are about to drop the column `texts` on the `Masterclass` table. All the data in the column will be lost.
  - Added the required column `interactions` to the `Masterclass` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Masterclass" DROP COLUMN "popups",
DROP COLUMN "texts",
ADD COLUMN     "imageLink" TEXT,
ADD COLUMN     "interactions" TEXT NOT NULL,
ADD COLUMN     "topics" TEXT[];
