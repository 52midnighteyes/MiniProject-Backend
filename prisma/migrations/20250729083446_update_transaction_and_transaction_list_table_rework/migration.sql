/*
  Warnings:

  - You are about to drop the column `attending_at` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `is_attending` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "attending_at",
DROP COLUMN "is_attending";

-- AlterTable
ALTER TABLE "TransactionList" ADD COLUMN     "attending_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_attending" BOOLEAN NOT NULL DEFAULT false;
