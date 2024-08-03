/*
  Warnings:

  - A unique constraint covering the columns `[id,userName]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userNamed` to the `blog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "blog" DROP CONSTRAINT "blog_userId_fkey";

-- AlterTable
ALTER TABLE "blog" ADD COLUMN     "userNamed" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_id_userName_key" ON "users"("id", "userName");

-- AddForeignKey
ALTER TABLE "blog" ADD CONSTRAINT "blog_userId_userNamed_fkey" FOREIGN KEY ("userId", "userNamed") REFERENCES "users"("id", "userName") ON DELETE RESTRICT ON UPDATE CASCADE;
