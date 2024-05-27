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
      const response = NextResponse.json(allItems);
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');
      response.headers.set('Surrogate-Control', 'no-store');
      return response;
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
//Math.floor(Math.random() * 1000)