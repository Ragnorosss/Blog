-- DropForeignKey
ALTER TABLE "blog" DROP CONSTRAINT "blog_userId_fkey";

-- AlterTable
ALTER TABLE "blog" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "blog" ADD CONSTRAINT "blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
