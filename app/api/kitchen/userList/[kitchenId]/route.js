//localhost:3000/api/kitchen/userList/2
import { NextResponse } from "next/server";
const {getUserInKitchenList} = require('../../slots');

const GET = async (req, { params }) => {
    const kitchenId = await parseInt(params.kitchenId);
    const userInKitchen = await getUserInKitchenList(kitchenId);
    if (userInKitchen.length > 0) {
      return NextResponse.json(userInKitchen);
    } else {
        return NextResponse.json([])
    }
};

export { GET };
