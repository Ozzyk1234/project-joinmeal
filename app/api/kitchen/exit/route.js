import { NextResponse } from "next/server";
const {removeUserFromKitchen} = require('../slots');

const kitchenExit = async (req, res) => {
  const body = await req.json();
  const idUser = parseInt(body.idUser)
  try {
    await removeUserFromKitchen(idUser);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Błąd:", error);
    return new NextResponse(
      { message: "Wystąpił błąd" },
      { status: 500 }
    );
  }
};

export { kitchenExit as POST };
