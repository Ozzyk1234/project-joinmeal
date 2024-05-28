import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

async function getFriends(req, { params }) {
  const userId = parseInt(params.userId, 10);
  console.log(userId);
  const friendships = await prisma.friendship.findMany({
    where: {
      OR: [{ userId: userId }, { friendId: userId }],
    },
    include: {
      friend: true,
    },
  });

  if (!friendships) {
    console.log("Użytkownik nie został znaleziony.");
    return NextResponse.json([]);
  }

  return NextResponse.json(friendships);
}

export { getFriends as GET };
