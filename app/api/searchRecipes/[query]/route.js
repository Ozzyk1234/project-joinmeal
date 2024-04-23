import { NextResponse } from "next/server";

const GET = async (req, { params }) => {
  const query = await params.query;
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`;

  try {
    const spoonacularResponse = await fetch(url);
    const data = await spoonacularResponse.json();
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Błąd podczas pobierania przepisów", error },
      { status: 500 }
    );
  }
};

export { GET };
