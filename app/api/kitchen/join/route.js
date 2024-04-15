// localhost:3000/api/kitchen/join
// {
//   "idUser":1,
//   "idKitchen":2,
//   "time":2 
// }

import { NextResponse } from "next/server";
const {addUserToKitchen} = require('../slots');

const kitchenJoin = async (req, res) => {
  const body = await req.json();
  const idUser = parseInt(body.idUser)
  const idKitchen = parseInt(body.idKitchen)
  const time = parseInt(body.time)
  try {
    await addUserToKitchen(idKitchen, idUser, time);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Błąd:", error);
    return new NextResponse(
      { message: "Wystąpił błąd" },
      { status: 500 }
    );
  }
};

export { kitchenJoin as POST };