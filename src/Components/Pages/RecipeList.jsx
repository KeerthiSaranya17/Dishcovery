import React from "react";
import RecipeCard from "./RecipeCard";

const RecipeList = ({ recipes, onSelect, loading }) => {
  console.log("Rendering recipes:", recipes.length);
  if (loading) {
    return (
      <p className="mt-6 text-gray-600 text-center">Loading recipes...</p>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <p className="mt-6 text-gray-600 text-center">
        No recipes found. Try another ingredient!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
      {recipes.map((meal) => (
        <RecipeCard key={meal.idMeal} meal={meal} onSelect={onSelect} />
      ))}
    </div>
  );
};
export default RecipeList;
