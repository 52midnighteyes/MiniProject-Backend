-- AlterEnum
ALTER TYPE "EventWebsite"."TransactionStatus" ADD VALUE 'WAITING_FOR_CONFIRMATION';

-- AlterTable
ALTER TABLE "EventWebsite"."Transaction" ALTER COLUMN "expired_at" DROP NOT NULL;
