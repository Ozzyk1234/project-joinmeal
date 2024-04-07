import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const GET = async (req, { params }) => {
  const itemId = await params.itemId;
  const intItemId = parseInt(itemId, 10);

  if (intItemId) {
    const checkUpdate = await prisma.item.update({
      where: {
        id: intItemId,
      },
      data: {
        status: false,
      },
    });

    if (checkUpdate) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { message: "Nie udało się usunac przedmiotu" },
        { status: 404 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Nieprawidłowy identyfikator przedmiotu" },
      { status: 400 }
    );
  }
};

export { GET };
