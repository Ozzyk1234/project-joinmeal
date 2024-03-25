import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const GET = async (req, { params }) => {
  const userId = params.userId;
  const intUserId = parseInt(userId, 10);
  try {
    const userData = await prisma.user.findUnique({
      where: {
        id: intUserId,
      },
    });

    return new NextResponse(userData, { status: 200 });
  } catch (err) {
    return new NextResponse(err, { status: 500 });
  }
};

export { GET };
