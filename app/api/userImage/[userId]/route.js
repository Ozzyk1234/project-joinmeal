import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

const POSTUserImage = async (req, { params }) => {
  const userId = params.userId;
  const userIdINT = parseInt(userId, 10);
  const { picture } = await req.json(); // Assuming you send the image data as { picture: imageDataURL }

  const updateImage = await prisma.user.update({
    where: { id: userIdINT },
    data: {
      picture: btoa(picture),
    },
  });

  if (updateImage) {
    prisma.$disconnect();
    return NextResponse.json({ message: true }, { status: 200 });
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
