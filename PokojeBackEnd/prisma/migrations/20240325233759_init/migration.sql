-- AlterTable
ALTER TABLE `room` MODIFY `useSlots` INTEGER NOT NULL DEFAULT 0,
    MODIFY `status` BOOLEAN NOT NULL DEFAULT true;
