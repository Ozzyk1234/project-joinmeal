import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const GET = async (req, { params }) => {
  try {
    const page = await params.page;
    const pageSize = await params.pageSize;

    const now = new Date();
    const currentDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString();
    await prisma.room.updateMany({
      where: {
        status: true,
        time: {
          lt: currentDate,
        },
      },
      data: {
        status: false,
      },
    });

    const skip = (parseInt(page) - 1) * parseInt(pageSize);
    const allRooms = await prisma.room.findMany({
      where: {
        status: true,
      },
      include: {
        UserCreated: {
          select: {
            userName: true,
          },
        },
      },
      skip: skip,
      take: parseInt(pageSize),
    });

    const totalCount = await prisma.room.count({
      where: {
        status: true,
      },
    });

    return NextResponse.json({ rooms: allRooms, totalCount }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

export { GET };
