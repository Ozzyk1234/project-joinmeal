/*
  Warnings:

  - A unique constraint covering the columns `[idAccount]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_idAccount_key` ON `User`(`idAccount`);
