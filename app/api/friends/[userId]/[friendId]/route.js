import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const GET = async (req, { params }) => {
  const userId = parseInt(params.userId, 10);
  const friendId = parseInt(params.friendId, 10);

  console.log(userId);
  console.log(friendId);

  const existingFriendship = await prisma.friendship.findFirst({
    where: {
      AND: [{ userId: { equals: userId } }, { friendId: { equals: friendId } }],
    },
  });

  if (existingFriendship) {
    return NextResponse.json("Znajomy juz istnieje!");
  }

  // Create a new friendship
  await prisma.friendship.create({
    data: {
      userId: userId,
      friendId: friendId,
    },
  });

  return NextResponse.json("Znajomy został dodany!");
};

export { GET };
