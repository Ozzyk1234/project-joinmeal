import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

async function createNewRoom(req, { params }) {
  const body = await req.json();
  const cost = parseFloat(body.cost);
  const Id = params.userId;
  const userId = parseInt(Id, 10);
  console.log(body);
  try {
    const newRoom = await prisma.room.create({
      data: {
        idUserCreated: userId,
        name: body.roomName,
        slots: body.slots,
        time: body.time,
        cost: cost,
      },
    });
    if (newRoom) {
      return NextResponse.json({ message: "success" });
    }
  } catch (error) {
    console.error("Błąd podczas dodawania nowego pokoju do bazy:", error);
    return false;
  } finally {
    if (prisma.$isConnected) {
      await prisma.$disconnect();
    }
  }
}
export { createNewRoom as POST };
