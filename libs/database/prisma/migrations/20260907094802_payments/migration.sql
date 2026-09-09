/*
  Warnings:

  - You are about to drop the `BuedKeys` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BuedKeys" DROP CONSTRAINT "BuedKeys_promoCodeId_fkey";

-- DropForeignKey
ALTER TABLE "BuedKeys" DROP CONSTRAINT "BuedKeys_userId_fkey";

-- DropForeignKey
ALTER TABLE "BuedKeys" DROP CONSTRAINT "BuedKeys_vendorKeyId_fkey";

-- DropTable
DROP TABLE "BuedKeys";

-- CreateTable
CREATE TABLE "VendorKeyOrders" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "vendorKeyId" INTEGER,
    "promoCodeId" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "VendorKeyOrders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "eventId" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    "orderType" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "currencyCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_eventId_key" ON "Payment"("eventId");

-- AddForeignKey
ALTER TABLE "VendorKeys" ADD CONSTRAINT "VendorKeys_sku_fkey" FOREIGN KEY ("sku") REFERENCES "Products"("sku") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorKeyOrders" ADD CONSTRAINT "VendorKeyOrders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorKeyOrders" ADD CONSTRAINT "VendorKeyOrders_vendorKeyId_fkey" FOREIGN KEY ("vendorKeyId") REFERENCES "VendorKeys"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorKeyOrders" ADD CONSTRAINT "VendorKeyOrders_promoCodeId_fkey" FOREIGN KEY ("promoCodeId") REFERENCES "Promocodes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_currencyCode_fkey" FOREIGN KEY ("currencyCode") REFERENCES "Currency"("currencyCode") ON DELETE RESTRICT ON UPDATE CASCADE;
