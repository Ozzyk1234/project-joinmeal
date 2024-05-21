import { NextResponse } from "next/server";
import fetch from "node-fetch";
import * as deepl from "deepl-node";

const GET = async (req, { params }) => {
  const id = params.id;
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const authKeyDeepL = process.env.TRANSLATE_API_KEY;
  const translator = new deepl.Translator(authKeyDeepL);

  const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;

  try {
    const spoonacularResponse = await fetch(url);

    if (!spoonacularResponse.ok) {
      throw new Error(`HTTP error! status: ${spoonacularResponse.status}`);
    }

    const data = await spoonacularResponse.json();

    const translatedTitle = await translator.translateText(
      data.title,
      "EN",
      "PL"
    );
    const translatedSummary = await translator.translateText(
      data.summary,
      "EN",
      "PL"
    );
    const translatedInstructions = data.instructions
      ? await translator.translateText(data.instructions, "EN", "PL")
      : { text: null };

    const translatedIngredients = await Promise.all(
      data.extendedIngredients.map(async (ingredient, index) => {
        const translatedIngredient = await translator.translateText(
          ingredient.original,
          "EN",
          "PL"
        );
        return {
          ...ingredient,
          original: translatedIngredient.text,
          key: ingredient.id || index,
        };
      })
    );

    const translatedData = {
      ...data,
      title: translatedTitle.text,
      summary: translatedSummary.text,
      instructions: translatedInstructions.text,
      extendedIngredients: translatedIngredients,
    };

    return NextResponse.json({ data: translatedData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Błąd podczas pobierania szczegółów wybranego przepisu",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

export { GET };
