-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "firstName" TEXT DEFAULT 'BRAK DANYCH',
    "lastName" TEXT DEFAULT 'BRAK DANYCH',
    "picture" BYTEA,
    "age" INTEGER DEFAULT 0,
    "sex" TEXT DEFAULT 'Mężczyzna',
    "buildingName" TEXT DEFAULT 'DOM STUDENTA 2 - BLIZNIAK',
    "description" TEXT DEFAULT 'Podaj opis użytkownika...',
    "email" TEXT NOT NULL,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "idUser" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "status" BOOLEAN NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_idUserCreated_fkey" FOREIGN KEY ("idUserCreated") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomsUsers" ADD CONSTRAINT "RoomsUsers_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomsUsers" ADD CONSTRAINT "RoomsUsers_idRoom_fkey" FOREIGN KEY ("idRoom") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;