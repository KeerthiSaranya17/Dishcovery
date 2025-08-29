import React from "react";

const RecipeCard = ({ meal, onSelect }) => {
  return (
    <div
      className="bg-white shadow-md rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition"
      onClick={() => onSelect(meal.idMeal)}
    >
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-40 object-cover"
      />
      <div className="p-3">
        <h3 className="font-semibold text-md text-gray-800 truncate">
          {meal.strMeal}
        </h3>
      </div>
    </div>
  );
};

export default RecipeCard;
