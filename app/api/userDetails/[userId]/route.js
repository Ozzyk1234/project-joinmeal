import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = await new PrismaClient();

const GET = async (req, { params }) => {
  const userId = await params.userId;
  const intUserId = parseInt(userId, 10);

  if (intUserId) {
    const userData = await prisma.user.findUnique({
      where: {
        id: intUserId,
      },
      select: {
        description: true,
        picture: true,
        buildingName: true,
        userName: true,
        email: true,
        firstName: true,
        lastName: true,
        sex: true,
        age: true,
        createdAt: true,
      },
    });
    return new NextResponse(JSON.stringify(userData));
  }
  return new NextResponse(err, { status: 500 });
};

export { GET };
