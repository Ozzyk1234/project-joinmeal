import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const GET = async (req, res) => {
  try {
    const allItems = await prisma.board.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    if (allItems.length > 0) { 
      return NextResponse.json(allItems);
    } else {
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error("Błąd:", error);
    return NextResponse.json([]);
  } finally {
    await prisma.$disconnect();
  }
};

export { GET };
