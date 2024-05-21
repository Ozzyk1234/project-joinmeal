import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const GET = async () => {
  const allItems = await prisma.board.findMany();

  return NextResponse.json(allItems);
};

export { GET };
