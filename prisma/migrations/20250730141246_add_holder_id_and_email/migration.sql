-- AlterTable
ALTER TABLE "EventWebsite"."TransactionList" ADD COLUMN     "holder_id" TEXT;

-- AddForeignKey
ALTER TABLE "EventWebsite"."TransactionList" ADD CONSTRAINT "TransactionList_holder_id_fkey" FOREIGN KEY ("holder_id") REFERENCES "EventWebsite"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
