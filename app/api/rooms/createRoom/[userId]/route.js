import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

async function createNewRoom(req, { params }) {
  const body = await req.json();

  const date = body.formattedDate + ":00Z";
  const milliseconds = Date.parse(date);
  const Newdate = new Date(milliseconds);
  const Id = params.userId;
  try {
    const newRoom = await prisma.room.create({
      data: {
        idUserCreated: parseInt(Id, 10),
        name: body.roomName,
        slots: parseInt(body.slots, 10),
        useSlots: 1,
        time: Newdate,
        cost: parseFloat(body.cost),
        category: body.categoryofMeal,
        type: body.dishtype,
        dishimage: parseInt(body.dishImage, 10),
      },
    });
    if (newRoom) {
      return NextResponse.json(true);
    }
  } catch (error) {
    console.error("Błąd podczas dodawania nowego pokoju do bazy:", error);
    return NextResponse.json(false);
  } finally {
    if (prisma.$isConnected) {
      await prisma.$disconnect();
    }
  }
  return NextResponse.json(true);
}

export { createNewRoom as POST };
