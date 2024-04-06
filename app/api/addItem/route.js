import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const POST = async (req, res) => {
  const { idUser, name, expiryDate, cost } = req.body;

  try {
    const itemAdded = await prisma.item.create({
      data: {
        idUser: parseInt(idUser),
        name,
        expiryDate,
        cost: cost ? cost : 0,
      },
    });

    if (itemAdded) {
      return NextResponse.json({ success: true });
    } else {
      return new NextResponse(
        { message: "Nie udało się dodać przedmiotu" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Błąd podczas dodawania nowego przedmiotu (lodówka):", error);
    return new NextResponse(
      { message: "Wystąpił błąd podczas dodawania przedmiotu" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export { POST };