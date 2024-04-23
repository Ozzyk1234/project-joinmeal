import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const GET = async (req, { params }) => {
  const userId = await params.userId;
  const intUserId = parseInt(userId, 10);

  if (intUserId) {
    const userData = await prisma.user.findUnique({
      where: {
        id: intUserId,
      },
      select: {
        id: true,
        buildingName: true,
      },
    });
    return NextResponse.json(userData);
  }
  return new NextResponse({ message: "ERROR" }, { status: 500 });
};

export { GET };
