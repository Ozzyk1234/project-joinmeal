import { NextResponse } from "next/server";
import fetch from "node-fetch";
import * as deepl from "deepl-node";

const GET = async (req, { params }) => {
  const query = await params.query;
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const authKeyDeepL = process.env.TRANSLATE_API_KEY;
  const translator = new deepl.Translator(authKeyDeepL);

  try {
    const translationResult = await translator.translateText(
      query,
      "PL",
      "EN-US"
    );
    const translatedQuery = translationResult.text;

    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${translatedQuery}`;

    const spoonacularResponse = await fetch(url);

    if (!spoonacularResponse.ok) {
      throw new Error(`HTTP error! status: ${spoonacularResponse.status}`);
    }

    const data = await spoonacularResponse.json();

    const translations = await Promise.all(
      data.results.map(async (item) => {
        const translatedTitle = await translator.translateText(
          item.title,
          "EN",
          "PL"
        );
        return {
          ...item,
          title: translatedTitle.text,
        };
      })
    );

    const translatedData = {
      ...data,
      results: translations,
    };

    return NextResponse.json({ data: translatedData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Błąd podczas przetwarzania zapytania", error: error.message },
      { status: 500 }
    );
  }
};

export { GET };
