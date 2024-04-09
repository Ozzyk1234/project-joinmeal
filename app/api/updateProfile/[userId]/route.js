import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const POST = async (req, { params }) => {
  const userId = params.userId;
  const intUserId = parseInt(userId, 10);
  const body = await req.json();

  if (!intUserId) {
    return new NextResponse("Invalid user ID", { status: 400 });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: intUserId,
      },
      data: {
        description: body.description,
        buildingName: body.buildingName,
        userName: body.userName,
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        sex: body.sex,
        age: parseInt(body.age, 10),
      },
      select: {
        description: true,
        buildingName: true,
        userName: true,
        email: true,
        firstName: true,
        lastName: true,
        sex: true,
        age: true,
      },
    });
    return new NextResponse(JSON.stringify(updatedUser));
  } catch (error) {
    console.error("Error updating user:", error);
    return new NextResponse("Error updating user", { status: 500 });
  }
};

export { POST };
