//localhost:3000/api/kitchen/list

import { NextResponse } from "next/server";
const {getKitchenList} = require('../slots');

const GET = async (req, res) => {
    const allKitchen = await getKitchenList();
    if (allKitchen.length > 0) {
      return NextResponse.json(allKitchen);
    } else {
        return new NextResponse(
            { message: "Blad pobierania kuchni" },
            { status: 500 }
        )
    }
};

export { GET };
