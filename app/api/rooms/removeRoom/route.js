import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const RemoveRoom = async (req) => {
  const url = new URL(req.url);

  const Iduser = parseInt(url.searchParams.get("userId"), 10);
  const Idroom = parseInt(url.searchParams.get("roomId"), 10);

  const isOwner = await prisma.room.findUnique({
    where: { id: Idroom, idUserCreated: Iduser },
  });

  if (isOwner) {
    await prisma.roomsUsers.deleteMany({
      where: { idRoom: Idroom },
    });

    const removeRoom = await prisma.room.delete({
      where: { id: Idroom },
    });
    return NextResponse.json({ message: "Usunięto pokój" }, { status: 200 });
  }
  return NextResponse.json(
    { message: "Nie jestes wlascicielem" },
    { status: 404 }
  );
};

export { RemoveRoom as GET };
