import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

<<<<<<< HEAD
const GET = async () => {
=======
const GET = async (req, { params }) => {
  let allItems = [];
>>>>>>> 11e51bb4db310ea01fe9719c89b6d55621963579
  try {
      allItems = await prisma.board.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (allItems.length > 0) {
      return NextResponse.json(allItems, {
        headers: {
          "Cache-Control": "no-cache",
        },
      });
    } else {
      return NextResponse.json([], {
        headers: {
          "Cache-Control": "no-cache",
        },
      });
    }
  } catch (error) {
    console.error("Błąd podczas dodawania nowego ogłoszenia (board):", error);
    return new NextResponse(
      { message: "Wystąpił błąd podczas pobierania ogłoszen" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export { GET };
