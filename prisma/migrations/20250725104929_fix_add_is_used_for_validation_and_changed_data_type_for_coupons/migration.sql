-- AlterTable
ALTER TABLE "Coupon" ADD COLUMN     "is_used" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "discount_amount" SET DEFAULT 0.10,
ALTER COLUMN "discount_amount" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Points" ADD COLUMN     "is_used" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "points_amount" SET DEFAULT 10000;
