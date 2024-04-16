//localhost:3000/api/kitchen/userList/1

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const GET = async (req, res) => {
  try {
    const userInKitchen = await prisma.userInKitchen.findMany();
    if (userInKitchen.length > 0) {
      return NextResponse.json(userInKitchen);
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
