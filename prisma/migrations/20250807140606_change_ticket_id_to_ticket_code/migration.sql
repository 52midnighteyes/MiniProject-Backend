/*
  Warnings:

  - You are about to drop the column `ticket_id` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EventWebsite"."Transaction" DROP COLUMN "ticket_id",
ADD COLUMN     "ticket_code" TEXT;
