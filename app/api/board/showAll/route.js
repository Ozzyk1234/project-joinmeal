import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const GET = async () => {
  try {
    const allItems = await prisma.board.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(allItems, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Error fetching board items:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error fetching board items" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export { GET };
