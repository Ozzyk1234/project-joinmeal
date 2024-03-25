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
      image: btoa(pictureUser),
    },
  });

  if (updateImage) {
    prisma.$disconnect();
    return new NextResponse({ success: true }, { status: 200 });
  }
};

const GETUserImage = async (req, { params }) => {
  const userId = params.userId;

  const userIdINT = parseInt(userId, 10);
  if (userIdINT) {
    try {
      const userImage = await prisma.user.findUnique({
        where: {
          id: userIdINT,
        },
        select: {
          image: true,
        },
      });
      if (userImage) {
        const base64Image = Buffer.from(userImage.image).toString("base64");

        const encodedImage = atob(base64Image);
        return new NextResponse(JSON.stringify(encodedImage), {
          status: 200,
        });
      } else {
        return new NextResponse(
          JSON.stringify({ message: "Nie znaleziono użytkownika" }),
          { status: 404 }
        );
      }
    } catch (err) {
      return new NextResponse(JSON.stringify({ message: err.toString() }), {
        status: 500,
      });
    }
  }
};
export { POSTUserImage as POST, GETUserImage as GET };
