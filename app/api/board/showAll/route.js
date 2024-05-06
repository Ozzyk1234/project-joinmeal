import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const GET = async (req, { params }) => {
    const allItems = await prisma.board.findMany();

    if (allItems.length > 0) {
      return NextResponse.json(allItems);
    } else {
      return NextResponse.json([]);
    }
}

export { GET };
