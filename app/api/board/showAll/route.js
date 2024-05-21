import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

<<<<<<< HEAD
const GET = async () => {
=======
const GET = async (req, res) => {
  let allItems = [];
>>>>>>> 2c5d83fff9c45776e280eea9cfe29a1ed548ca92
  try {
    let allItems = await prisma.board.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (allItems.length > 0) {
<<<<<<< HEAD
      return NextResponse.json(allItems);
=======
      return NextResponse.json(allItems, {
        headers: {
          "Cache-Control": "no-cache",
        },
      });
>>>>>>> 2c5d83fff9c45776e280eea9cfe29a1ed548ca92
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
