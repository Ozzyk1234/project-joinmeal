//localhost:3000/api/kitchen/list

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
<<<<<<< HEAD
const { getKitchenList } = require("../slots");

const GET = async (req, res) => {
  const allKitchen = await getKitchenList();
  if (allKitchen.length > 0) {
    return NextResponse.json(allKitchen);
  } else {
    return NextResponse.json(
      { message: "Blad pobierania kuchni" },
=======

const prisma = new PrismaClient();

const GET = async (req, res) => {
  try {
    const allKitchen = await prisma.kitchen.findMany();
    if (allKitchen.length > 0) {
      return NextResponse.json(allKitchen);
    } else {
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error("Błąd:", error);
    return new NextResponse(
      { message: "Wystąpił błąd podczas pobierania danych z bazy." },
>>>>>>> 1b4c3d6e09f9709fd1b24a90bb3a500b6b7e2159
      { status: 500 }
    );
  }
};

export { GET };
