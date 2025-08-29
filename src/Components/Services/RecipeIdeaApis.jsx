import axios from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1";

// 1. Search by ingredient
export async function searchByIngredient(ingredient) {
  try {
    const res = await axios.get(`${API_URL}/filter.php?i=${ingredient}`);
    return res.data.meals;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}

// 2. Get recipe details by ID
export async function getRecipeDetails(mealId) {
  try {
    const res = await axios.get(`${API_URL}/lookup.php?i=${mealId}`);
    return res.data.meals[0];
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return null;
  }
}

// 3. Get random recipe (for surprise)
export async function getRandomRecipe() {
  try {
    const res = await axios.get(`${API_URL}/random.php`);
    return res.data.meals[0];
  } catch (error) {
    console.error("Error fetching random recipe:", error);
    return null;
  }
}

// 4. Get recipes by category (mood filter)
export const getByCategory = async (category) => {
  try {
    const res = await axios.get(`${API_URL}/filter.php?c=${category}`);
    return res.data.meals || [];
  } catch (error) {
    console.error("Error fetching recipes by category:", error);
    return [];
  }
};

// 5. Get all categories (for showing filter buttons)
export const getCategories = async () => {
  try {
    const res = await axios.get(`${API_URL}/list.php?c=list`);
    return res.data.meals || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// 6. Search by meal name (optional)
export const searchByName = async (mealName) => {
  try {
    const res = await axios.get(`${API_URL}/search.php?s=${mealName}`);
    return res.data.meals || [];
  } catch (error) {
    console.error("Error searching recipe by name:", error);
    return [];
  }
};

// 7. Get recipes by area (optional for cuisine type)
export const getByArea = async (area) => {
  try {
    const res = await axios.get(`${API_URL}/filter.php?a=${area}`);
    return res.data.meals || [];
  } catch (error) {
    console.error("Error fetching recipes by area:", error);
    return [];
  }
};
