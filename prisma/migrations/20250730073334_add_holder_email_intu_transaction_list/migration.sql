/*
  Warnings:

  - Added the required column `holder_email` to the `TransactionList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransactionList" ADD COLUMN     "holder_email" TEXT NOT NULL;
