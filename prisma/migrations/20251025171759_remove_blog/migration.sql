/*
  Warnings:

  - You are about to drop the `Blog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_likedBlogs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_viewedBlogs` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `viewedBlogs` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."_likedBlogs" DROP CONSTRAINT "_likedBlogs_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_likedBlogs" DROP CONSTRAINT "_likedBlogs_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_viewedBlogs" DROP CONSTRAINT "_viewedBlogs_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_viewedBlogs" DROP CONSTRAINT "_viewedBlogs_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "viewedBlogs" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."Blog";

-- DropTable
DROP TABLE "public"."_likedBlogs";

-- DropTable
DROP TABLE "public"."_viewedBlogs";
