-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "idAccount" INTEGER NOT NULL,
    "userName" TEXT NOT NULL,
    "image" BYTEA,
    "buildingName" TEXT,
    "description" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_idAccount_key" ON "User"("idAccount");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
