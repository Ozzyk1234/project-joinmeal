"use client";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout";
import React, { useState } from "react";

const Recipe = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    if (!query) return;

    try {
      const response = await fetch(
        `/api/searchRecipes/${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error("Błąd podczas pobierania przepisów:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-[80%] h-screen border-r-[1px] border-l-[1px] border-gray-200 ml-[10%] pt-24 flex flex-col">
        <div>
          <div className="flex flex-row w-full h-fit items-center justify-between gap-2 pr-7">
            <input
              type="text"
              placeholder="Szukaj przepisu..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="rounded-lg border-2 border-gray-200 py-2 px-3 w-full"
            />
            <button
              onClick={handleSearch}
              className="rounded-lg text-white bg-[#0A390C] py-2 px-3"
            >
              Szukaj
            </button>
          </div>
          <h1 className="text-4xl text-center mt-9">Wyniki wyszukiwania:</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-gray-200 p-4 rounded-lg flex flex-col items-center"
              >
                <img
                  src={recipe.image}
                  alt={`Przepis na ${recipe.title}`}
                  className="w-full h-auto mb-4 rounded"
                />
                <h3 className="text-lg font-bold">{recipe.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Recipe;
