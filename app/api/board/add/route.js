import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const addNew = async (req, res) => {
  const body = await req.json();
  console.log(body);
  const idUser = parseInt(body.idUser, 10);
  const message = body.message;
  try {
    const addBoard = await prisma.board.create({
      data: {
        userId: idUser,
        message: message,
      },
    });

    if (addBoard) {
      return NextResponse.json({ success: true });
    } else {
      return new NextResponse(
        { message: "Nie udało się dodać ogłoszenia" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Błąd podczas dodawania nowego ogłoszenia (board):", error);
    return new NextResponse(
      { message: "Wystąpił błąd podczas dodawania ogłoszenia" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export { addNew as POST };
