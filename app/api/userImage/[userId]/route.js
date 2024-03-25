import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = await new PrismaClient();

const POSTUserImage = async (req, { params }) => {
  const userId = params.userId;
  const { result } = await req.json();

  const userIdINT = parseInt(userId, 10);
  const pictureUser = await result;

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

export { POSTUserImage as POST };
