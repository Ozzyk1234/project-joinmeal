import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const GET = async (req, { params }) => {
  const userId = await params.userId;
  const intUserId = parseInt(userId, 10);

  if (intUserId) {
    const allItems = await prisma.item.findMany({
      where: {
        status: true,
        idUser: intUserId,
      },
    });

    if (allItems.length > 0) {
      return NextResponse.json(allItems);
    } else {
      return NextResponse.json(
        { message: "Nie znaleziono przedmiotów dla użytkownika" },
        { status: 404 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Nieprawidłowy identyfikator użytkownika" },
      { status: 400 }
    );
  }
};

export { GET };
