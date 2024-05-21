import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const GET = async (req, { params }) => {
  let allItems = [];
  try {
      allItems = await prisma.board.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (await allItems.length > 0) {
      return NextResponse.json(allItems);
    } else {
      return NextResponse.json([]);
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
}

export { GET };
