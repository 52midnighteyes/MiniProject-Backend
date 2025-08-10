/*
  Warnings:

  - You are about to drop the column `transaction_list_id` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the `TransactionList` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[transaction_id]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `transaction_id` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticket_type_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EventWebsite"."Rating" DROP CONSTRAINT "Rating_transaction_list_id_fkey";

-- DropForeignKey
ALTER TABLE "EventWebsite"."TransactionList" DROP CONSTRAINT "TransactionList_holder_id_fkey";

-- DropForeignKey
ALTER TABLE "EventWebsite"."TransactionList" DROP CONSTRAINT "TransactionList_ticket_type_id_fkey";

-- DropForeignKey
ALTER TABLE "EventWebsite"."TransactionList" DROP CONSTRAINT "TransactionList_transaction_id_fkey";

-- DropIndex
DROP INDEX "EventWebsite"."Rating_transaction_list_id_key";

-- AlterTable
ALTER TABLE "EventWebsite"."Event" ALTER COLUMN "header" DROP NOT NULL;

-- AlterTable
ALTER TABLE "EventWebsite"."Rating" DROP COLUMN "transaction_list_id",
ADD COLUMN     "transaction_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "EventWebsite"."Transaction" ADD COLUMN     "is_attending" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ticket_id" TEXT,
ADD COLUMN     "ticket_type_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "EventWebsite"."TransactionList";

-- CreateIndex
CREATE UNIQUE INDEX "Rating_transaction_id_key" ON "EventWebsite"."Rating"("transaction_id");

-- AddForeignKey
ALTER TABLE "EventWebsite"."Transaction" ADD CONSTRAINT "Transaction_ticket_type_id_fkey" FOREIGN KEY ("ticket_type_id") REFERENCES "EventWebsite"."TicketType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventWebsite"."Rating" ADD CONSTRAINT "Rating_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "EventWebsite"."Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
