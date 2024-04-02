-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_idUserCreated_fkey` FOREIGN KEY (`idUserCreated`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
