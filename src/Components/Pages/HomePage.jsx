import React, { useState, useEffect } from "react";
import CategoryFilter from "./Category";
// import axios from "axios";
import SearchBar from "./SearchBar";
import RecipeList from "./RecipeList";
import Category from "./Category";
import {
  searchByIngredient,
  getRecipeDetails,
  getRandomRecipe,
} from "../Services/RecipeIdeaApis";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔑 Fetch random recipes when app opens
 useEffect(() => {
  const fetchRandomRecipes = async () => {
    try {
      setLoading(true); // start loading
      const requests = Array.from({ length: 16 }, () => getRandomRecipe());
      const responses = await Promise.all(requests);
      // filter out any null values (if an API call failed)
      const randomMeals = responses.filter((meal) => meal !== null);
      const uniqueMeals = Array.from(
        new Map(randomMeals.map((meal) => [meal.idMeal, meal])).values()
      );
      console.log("Fetched:", randomMeals.length, "Unique:", uniqueMeals.length);

      setRecipes(uniqueMeals);
      // console.log(randomMeals.length);
      // setRecipes(randomMeals);
    } catch (err) {
      console.error("Error fetching random recipes:", err);
    } finally {
      setLoading(false); // stop loading
    }
  };

  fetchRandomRecipes();
}, []);


const handleSearch = async (ingredient) => {
  if (!ingredient) return;
  setLoading(true);
  const data = await searchByIngredient(ingredient);
  setRecipes(data || []);
  setSelectedRecipe(null);
  setLoading(false);
};


  const handleSelectRecipe = async (mealId) => {
    const data = await getRecipeDetails(mealId);
    setSelectedRecipe(data);
  };

  
  return (
    <div className="p-6">
      <div className="bg-black w-full h-[80px] flex items-center justify-between p-8 fixed top-0 left-0 right-0 z-10 overflow-hidden">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <img className="w-[30px] h-[30px]" src="chef.png" />
          <h1 className="text-[30px]  bg-gradient-to-r from-[#544a7d] to-[#ffd452] bg-clip-text text-transparent font-bold">Dishcovery</h1>
        </div>

        {/* Right section (Search) */}
        <div className="flex justify-between items-center gap-4">
          <Category onSelect={handleSearch} />
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
<div className="pt-[55px] p-6">
       {selectedRecipe ? (
      <div className="mt-6 p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={() => setSelectedRecipe(null)}
          className="mb-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-900"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold mb-4">{selectedRecipe.strMeal}</h2>
        <div className="flex gap-8 flex-col md:flex-row">
        <img
          src={selectedRecipe.strMealThumb}
          alt={selectedRecipe.strMeal}
          className="max-w-[300px] rounded-lg mb-6"
        />
        <div>
        <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
        <ul className="list-disc ml-5 mb-6 text-gray-700">
          {Object.keys(selectedRecipe)
            .filter(
              (key) =>
                key.startsWith("strIngredient") && selectedRecipe[key]
            )
            .map((key, index) => (
              <p key={index}>{selectedRecipe[key]}</p>
            ))}
        </ul>
        </div>
</div>
        

        <h3 className="text-xl font-semibold mb-2">Instructions</h3>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
          {selectedRecipe.strInstructions}
        </p>
      </div>
    ) : (
      // Otherwise → show recipe list
      <RecipeList recipes={recipes} onSelect={handleSelectRecipe} loading={loading} />

    )}
  </div>
  </div>
  );
};

export default HomePage;
