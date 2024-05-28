import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

const GET = async (req, { params }) => {
  const kitchenId = parseInt(params.kitchenId, 10);
  console.log(kitchenId);

  try {
    const now = new Date();
    const currentDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString();
    await prisma.userInKitchen.deleteMany({
      where: {
        dateToEnd: {
          lt: currentDate,
        },
      }
    });

    const allKitchen = await prisma.kitchen.findUnique({
      where: { id: kitchenId },
    });
    return NextResponse.json(allKitchen);
  } catch (error) {
    console.error("Błąd:", error);
    return new NextResponse(
      { message: "Wystąpił błąd podczas pobierania danych z bazy." },

      { status: 500 }
    );
  }
};

export { GET };
