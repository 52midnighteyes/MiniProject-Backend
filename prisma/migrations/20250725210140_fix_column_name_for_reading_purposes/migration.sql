/*
  Warnings:

  - You are about to drop the column `referal_code` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[referral_code]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `referral_code` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_referal_code_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "referal_code",
ADD COLUMN     "referral_code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_referral_code_key" ON "User"("referral_code");
