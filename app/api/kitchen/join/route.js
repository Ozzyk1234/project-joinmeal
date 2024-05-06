// localhost:3000/api/kitchen/join
// {
//   "idUser": 1,
//   "idKitchen": 1,
//   "dateToEnd":"2024-04-16T12:00"
// }

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const joinToKitchen = async (req, res) => {
  const body = await req.json();
  console.log(body);
  const idUser = parseInt(body.userId);
  const idKitchen = parseInt(body.kitchenId);
  const expiryDate = body.time;
  const date = expiryDate + ":00Z";
  const milliseconds = Date.parse(date);
  const Newdate = new Date(milliseconds);
  try {
    const itemAdded = await prisma.userInKitchen.create({
      data: {
        idUser: idUser,
        idKitchen: idKitchen,
        dateToEnd: Newdate,
      },
    });

    if (itemAdded) {
      return NextResponse.json({ success: true });
    } else {
      return new NextResponse(
        { message: "Nie udało się dolaczyc do kuchni" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Błąd podczas dolaczania do kuchni:", error);
    return new NextResponse(
      { message: "Wystąpił błąd podczas dolacznia do kuchni" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export { joinToKitchen as POST };
