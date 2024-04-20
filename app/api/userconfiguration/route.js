import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const GET = async (req) => {
  const urlParams = new URL(req.url, "http://localhost:3000").searchParams;
  const userId = parseInt(urlParams.get("userId"));
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      isConfigured: true,
    },
  });
  return NextResponse.json(user);
};

const POST = async (req) => {
  const urlParams = new URL(req.url, "http://localhost:3000").searchParams;
  const userId = parseInt(urlParams.get("userId"));
  const body = await req.json();
  const userConfiguration = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      sex: body.gender,
      buildingName: body.building,
      isConfigured: true,
    },
  });
  return NextResponse.json({
    message: "Użytkownik został skonfigurowany prawidłowo",
  });
};

export { GET, POST };
