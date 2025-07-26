/*
  Warnings:

  - You are about to drop the column `referrer_id` on the `Points` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Points" DROP CONSTRAINT "Points_referrer_id_fkey";

-- AlterTable
ALTER TABLE "Points" DROP COLUMN "referrer_id";
