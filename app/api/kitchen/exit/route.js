// localhost:3000/api/kitchen/exit
// {
//     "idUser": 1
// }

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const kitchenExit = async (req, res) => {
  const body = await req.json();
  const idUser = parseInt(body.idUser);

  try {
    await prisma.userInKitchen.deleteMany({
      where: {
        idUser: idUser
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Błąd:", error);
    return new NextResponse(
      { message: "Wystąpił błąd podczas usuwania rekordów użytkownika z kuchni." },
      { status: 500 }
    );
  }
};

export { kitchenExit as POST };
