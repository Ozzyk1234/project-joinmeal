import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const POST = async (req, { params }) => {
  const userId = parseInt(params.userId);
  const roomId = parseInt(params.roomId);
  const joined = await joinOrExit(userId, roomId);
  return NextResponse.json({ message: "success" });
};

async function joinOrExit(idUser, idRoom) {
  try {
    const userJoined = await prisma.roomsUsers.findFirst({
      where: {
        idUser: idUser,
        idRoom: idRoom,
      },
    });
    if (userJoined) {
      exitFromRoom(idUser, idRoom);
    } else {
      joinToRoom(idUser, idRoom);
    }
  } catch (error) {
    console.error(
      "Błąd podczas wyszukiwania użytkownika w bazie RoomsUsers:",
      error
    );
    return false;
  } finally {
    if (prisma.$isConnected) {
      await prisma.$disconnect();
    }
  }
}

async function exitFromRoom(idUser, idRoom) {
  try {
    const userExited = await prisma.roomsUsers.deleteMany({
      where: {
        idUser: idUser,
        idRoom: idRoom,
      },
    });
    if (userExited) {
      if (await decrementSlots(idRoom)) {
        return NextResponse.json({ message: true });
      }
    }
    return false;
  } catch (error) {
    console.error("Błąd podczas opuszczania pokoju:", error);
    return false;
  } finally {
    if (prisma.$isConnected) {
      await prisma.$disconnect();
    }
  }
}

async function joinToRoom(idUser, idRoom) {
  try {
    const userJoined = await prisma.roomsUsers.create({
      data: {
        idUser: idUser,
        idRoom: idRoom,
      },
    });
    if (userJoined) {
      if (await increaseSlots(idRoom)) {
        return NextResponse.json({ message: false });
      }
    }
    return false;
  } catch (error) {
    console.error("Błąd podczas dołączania do pokoju:", error);
    return false;
  } finally {
    if (prisma.$isConnected) {
      await prisma.$disconnect();
    }
  }
}

async function increaseSlots(roomId) {
  try {
    const updatedRoom = await prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        useSlots: {
          increment: 1,
        },
      },
    });
    if (updatedRoom) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Błąd podczas aktualizacji miejsc w pokoju:", error);
    return false;
  } finally {
    if (prisma.$isConnected) {
      await prisma.$disconnect();
    }
  }
}

async function decrementSlots(roomId) {
  try {
    const updatedRoom = await prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        useSlots: {
          decrement: 1,
        },
      },
    });
    if (updatedRoom) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Błąd podczas aktualizacji miejsc w pokoju:", error);
    return false;
  } finally {
    if (prisma.$isConnected) {
      await prisma.$disconnect();
    }
  }
}

const GET = async (req, { params }) => {
  const userId = parseInt(params.userId);
  const roomId = parseInt(params.roomId);
  const userExistsInRoom = await prisma.roomsUsers.findFirst({
    where: {
      idUser: userId,
      idRoom: roomId,
    },
  });
  if (userExistsInRoom) {
    return NextResponse.json({ message: true });
  } else {
    return NextResponse.json({ message: false });
  }
};

export { POST, GET };
