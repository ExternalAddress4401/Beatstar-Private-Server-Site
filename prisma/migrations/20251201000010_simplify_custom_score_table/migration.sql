/*
  Warnings:

  - You are about to drop the column `highestCheckpoint` on the `CustomScore` table. All the data in the column will be lost.
  - You are about to drop the column `highestGrade` on the `CustomScore` table. All the data in the column will be lost.
  - You are about to drop the column `highestStreak` on the `CustomScore` table. All the data in the column will be lost.
  - You are about to drop the column `playedCount` on the `CustomScore` table. All the data in the column will be lost.
  - Made the column `normalizedScore` on table `CustomScore` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CustomScore" DROP COLUMN "highestCheckpoint",
DROP COLUMN "highestGrade",
DROP COLUMN "highestStreak",
DROP COLUMN "playedCount",
ALTER COLUMN "normalizedScore" SET NOT NULL;
