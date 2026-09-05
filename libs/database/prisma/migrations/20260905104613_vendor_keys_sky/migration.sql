/*
  Warnings:

  - Added the required column `sky` to the `VendorKeys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VendorKeys" ADD COLUMN     "sky" TEXT NOT NULL;
