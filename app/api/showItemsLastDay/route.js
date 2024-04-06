import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const GET = async (req, res) => {
  try {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const localTimezoneOffset = currentDate.getTimezoneOffset() * 60000;
    const expiryThreshold = new Date(
      currentDate.getTime() - localTimezoneOffset + oneDayInMilliseconds
    );

    const itemsExpiringSoon = await prisma.item.findMany({
      where: {
        status: true,
        expiryDate: {
          lt: expiryThreshold,
        },
      },
    });

    return NextResponse.json(itemsExpiringSoon);
  } catch (error) {
    console.error(
      "Błąd podczas sprawdzania daty przedmiotów, które wygasają w ciągu najbliższego dnia z bazy (lodówka):",
      error
    );
    return new NextResponse(
      {
        message: "Wystąpił błąd podczas sprawdzania daty przedmiotów",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export { GET };
