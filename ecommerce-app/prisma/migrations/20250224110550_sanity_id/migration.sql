/*
  Warnings:

  - A unique constraint covering the columns `[sanityId]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sanityId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sanityId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sanityId]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sanityId` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sanityId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sanityId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sanityId` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "sanityId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "sanityId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "sanityId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "sanityId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Brand_sanityId_key" ON "Brand"("sanityId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_sanityId_key" ON "Category"("sanityId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_sanityId_key" ON "Product"("sanityId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_sanityId_key" ON "Tag"("sanityId");
