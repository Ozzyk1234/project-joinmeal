//localhost:3000/api/kitchen/countUser/1

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const GET = async (req, res) => {
    try {
      const countUsersInKitchen = await prisma.userInKitchen.count({
        where: {
          idkuchni: 1
        }
      });
      
      return NextResponse.json({ count: countUsersInKitchen });
    } catch (error) {
      console.error("Błąd:", error);
      return new NextResponse(
        { message: "Wystąpił błąd podczas pobierania danych z bazy." },
        { status: 500 }
      );
    }
  };
export { GET };