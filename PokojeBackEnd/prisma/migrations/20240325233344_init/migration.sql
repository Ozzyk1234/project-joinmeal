-- CreateTable
CREATE TABLE `Room` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUserCreated` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slots` INTEGER NOT NULL,
    `useSlots` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `cost` DOUBLE NOT NULL,
    `time` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoomsUsers` (
    `idUser` INTEGER NOT NULL,
    `idRoom` INTEGER NOT NULL,

    PRIMARY KEY (`idUser`, `idRoom`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RoomsUsers` ADD CONSTRAINT `RoomsUsers_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomsUsers` ADD CONSTRAINT `RoomsUsers_idRoom_fkey` FOREIGN KEY (`idRoom`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
