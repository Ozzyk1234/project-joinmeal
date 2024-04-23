import { NextResponse } from "next/server";

const GET = async (req, { params }) => {
  const id = await params.id;
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;

  try {
    console.log("TESATTSTS", url);
    const spoonacularResponse = await fetch(url);
    const data = await spoonacularResponse.json();
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Błąd podczas pobierania szczegółów wybranego przepisu",
        error,
      },
      { status: 500 }
    );
  }
};

export { GET };
