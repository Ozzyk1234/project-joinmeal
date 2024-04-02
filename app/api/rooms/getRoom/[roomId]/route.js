import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const GET = async (req, { params }) => {
  const roomId = params.roomId;
  try {
    const uniqueRoom = await prisma.room.findUnique({
      where: {
        id: parseInt(roomId, 10),
      },
      select: {
        name: true,
        slots: true,
        useSlots: true,
        status: true,
        cost: true,
        time: true,
        createdAt: true,
        UserCreated: true,
        users: true,
      },
    });

    return NextResponse.json({ room: uniqueRoom }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

export { GET };
