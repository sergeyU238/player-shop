/*
  Warnings:

  - You are about to drop the column `currency` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `sky` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `sky` on the `VendorKeys` table. All the data in the column will be lost.
  - You are about to drop the column `userd` on the `VendorKeys` table. All the data in the column will be lost.
  - You are about to drop the `BuedKyes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sku]` on the table `Products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Promocodes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `currencyCode` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPercent` to the `Promocodes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `VendorKeys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "currency",
DROP COLUMN "sky",
ADD COLUMN     "currencyCode" TEXT NOT NULL,
ADD COLUMN     "sku" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Promocodes" ADD COLUMN     "currencyCode" TEXT,
ADD COLUMN     "isPercent" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "VendorKeys" DROP COLUMN "sky",
DROP COLUMN "userd",
ADD COLUMN     "sku" TEXT NOT NULL,
ADD COLUMN     "used" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "BuedKyes";

-- CreateTable
CREATE TABLE "Currency" (
    "currencyCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BuedKeys" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "vendorKeyId" INTEGER NOT NULL,
    "promoCodeId" INTEGER,
    "buyedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BuedKeys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Currency_currencyCode_key" ON "Currency"("currencyCode");

-- CreateIndex
CREATE UNIQUE INDEX "Products_sku_key" ON "Products"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Promocodes_code_key" ON "Promocodes"("code");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_currencyCode_fkey" FOREIGN KEY ("currencyCode") REFERENCES "Currency"("currencyCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuedKeys" ADD CONSTRAINT "BuedKeys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuedKeys" ADD CONSTRAINT "BuedKeys_vendorKeyId_fkey" FOREIGN KEY ("vendorKeyId") REFERENCES "VendorKeys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuedKeys" ADD CONSTRAINT "BuedKeys_promoCodeId_fkey" FOREIGN KEY ("promoCodeId") REFERENCES "Promocodes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promocodes" ADD CONSTRAINT "Promocodes_currencyCode_fkey" FOREIGN KEY ("currencyCode") REFERENCES "Currency"("currencyCode") ON DELETE SET NULL ON UPDATE CASCADE;
