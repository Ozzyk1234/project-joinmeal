"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "../../../../components/DashboardLayout/DashboardLayout";
import { useRouter } from "next/navigation";

const SelectedRecipe = ({ params }) => {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const router = useRouter();
  const id = params.id;

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/selectedRecipe/${id}`);
          const data = await response.json();
          setRecipeDetails(data.data);
        } catch (error) {
          console.error("Error fetching recipe details:", error);
        }
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const goBackToRecipes = () => {
    router.push("/dashboard/recipe");
  };

  return (
    <DashboardLayout>
      {recipeDetails ? (
        <div className="w-[80%] mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src={recipeDetails.image}
            alt={recipeDetails.title}
            className="w-full h-auto object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">{recipeDetails.title}</h2>
            <h3 className="text-xl font-semibold">Składniki:</h3>
            <ul className="list-disc marker:text-green-600 pl-5 mb-4">
              {recipeDetails.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id} className="mb-1">
                  {ingredient.original}
                </li>
              ))}
            </ul>
            <h3 className="text-xl font-semibold">Instrukcje:</h3>
            <div
              className="instructions prose max-w-none"
              dangerouslySetInnerHTML={{ __html: recipeDetails.instructions }}
            />
          </div>
          <button
            onClick={goBackToRecipes}
            className="mt-4 py-2 px-4 bg-[#0A390C] text-white rounded hover:bg-green-700 transition duration-300"
          >
            Wróć
          </button>
        </div>
      ) : (
        <p className="text-center text-xl">Loading...</p>
      )}
    </DashboardLayout>
  );
};

export default SelectedRecipe;
