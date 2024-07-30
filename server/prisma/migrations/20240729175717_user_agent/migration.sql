/*
  Warnings:

  - Added the required column `user-agent` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "user-agent" TEXT NOT NULL;
