// localhost:3000/api/kitchen/create
// {
//   "slots": 3,
//   "buildingName": "Blizniak",
//   "floor":"2"
// }

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const createNewKitchen = async (req, res) => {
  const body = await req.json();
  const slots = parseInt(body.slots);
  const buildingName = body.buildingName;
  const floor = parseInt(body.floor);
  try {
    const kitchenJoin = await prisma.kitchen.create({
      data: {
        slots: slots,
        buildingName: buildingName,
        floor: floor,
      },
    });

    if (kitchenJoin) {
      return NextResponse.json({ success: true });
    } else {
      return new NextResponse(
        { message: "Nie udało się dodac nowej kuchni" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Błąd podczas dodwania nowej kuchni:", error);
    return new NextResponse(
      { message: "Wystąpił błąd podczas dodawania nowej kuchni" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export { createNewKitchen as POST };
