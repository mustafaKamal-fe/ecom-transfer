/*
  Warnings:

  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "permissions" DROP CONSTRAINT "permissions_roleId_fkey";

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "permissions" TEXT[],
ADD COLUMN     "userId" INTEGER;

-- DropTable
DROP TABLE "permissions";

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
