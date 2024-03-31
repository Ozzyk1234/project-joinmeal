-- AlterTable
ALTER TABLE "User" ALTER COLUMN "sex" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "idUserCreated" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slots" INTEGER NOT NULL,
    "useSlots" INTEGER NOT NULL DEFAULT 0,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "cost" DOUBLE PRECISION DEFAULT 0.0,
    "time" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomsUsers" (
    "idUser" INTEGER NOT NULL,
    "idRoom" INTEGER NOT NULL,

    CONSTRAINT "RoomsUsers_pkey" PRIMARY KEY ("idUser","idRoom")
);

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_idUserCreated_fkey" FOREIGN KEY ("idUserCreated") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomsUsers" ADD CONSTRAINT "RoomsUsers_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomsUsers" ADD CONSTRAINT "RoomsUsers_idRoom_fkey" FOREIGN KEY ("idRoom") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
