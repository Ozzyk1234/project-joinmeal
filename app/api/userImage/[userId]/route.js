import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

const POSTUserImage = async (req, { params }) => {
  const userId = params.userId;
  const { result } = await req.json();
  console.log(userId);

  const userIdINT = parseInt(userId, 10);
  const pictureUser = await result;
  console.log(userIdINT);

  const updateImage = await prisma.user.update({
    where: { id: userIdINT },
    data: {
      picture: btoa(pictureUser),
    },
  });

  if (updateImage) {
    prisma.$disconnect();
    return new NextResponse({ success: true }, { status: 200 });
  }
};

const GET = async (req, { params }) => {
  const userId = await params.userId;
  const intUserId = parseInt(userId, 10);

  if (intUserId) {
    const userData = await prisma.user.findUnique({
      where: {
        id: intUserId,
      },
      select: {
        picture: true,
      },
    });
    return NextResponse.json(userData);
  }
  return new NextResponse({ message: "ERROR" }, { status: 500 });
};

export { POSTUserImage as POST, GET };
