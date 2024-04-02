-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NULL DEFAULT 'BRAK DANYCH',
    `lastName` VARCHAR(191) NULL DEFAULT 'BRAK DANYCH',
    `picture` LONGBLOB NULL,
    `age` INTEGER NULL DEFAULT 0,
    `sex` VARCHAR(191) NULL DEFAULT 'Mężczyzna',
    `buildingName` VARCHAR(191) NULL DEFAULT 'DOM STUDENTA 2 - BLIZNIAK',
    `description` VARCHAR(191) NULL DEFAULT 'Podaj opis użytkownika...',
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
