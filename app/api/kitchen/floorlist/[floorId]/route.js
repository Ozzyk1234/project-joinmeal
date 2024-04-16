//localhost:3000/api/kitchen/list

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

const GET = async (req, { params }) => {
  const floorId = await parseInt(params.floorId, 10);
  console.log(floorId);
  try {
    const allKitchen = await prisma.kitchen.findMany({
      where: { floor: floorId },
    });
    if (allKitchen.length > 0) {
      return NextResponse.json(allKitchen);
    } else {
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error("Błąd:", error);
    return new NextResponse(
      { message: "Wystąpił błąd podczas pobierania danych z bazy." },

      { status: 500 }
    );
  }
};

export { GET };
