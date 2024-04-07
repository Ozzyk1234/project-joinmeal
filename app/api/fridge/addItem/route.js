import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const createNewItem = async (req, res) => {
  const body = await req.json();
  const idUser = body.idUser
  const name = body.name
  const expiryDate = body.expiryDate
  const cost =  body.cost ? body.cost : 0
  const date = expiryDate + ":00Z";
  const milliseconds = Date.parse(date);
  const Newdate = new Date(milliseconds);
  try {
    const itemAdded = await prisma.item.create({
      data: {
        idUser: parseInt(idUser),
        name: name,
        expiryDate: Newdate,
        cost: cost,
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

export { createNewItem as POST };
