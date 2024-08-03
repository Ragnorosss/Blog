/*
  Warnings:

  - You are about to drop the column `userNamed` on the `blog` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "blog" DROP CONSTRAINT "blog_userId_userNamed_fkey";

-- DropIndex
DROP INDEX "users_id_userName_key";

-- AlterTable
ALTER TABLE "blog" DROP COLUMN "userNamed";

-- AddForeignKey
ALTER TABLE "blog" ADD CONSTRAINT "blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
