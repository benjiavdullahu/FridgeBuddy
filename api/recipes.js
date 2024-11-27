/*
StAuth10244: I Benjamin Avdullahu, 000876877 certify that this material is my original work.
 No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."
*/
const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const fetchRecipes = async (ingredient, callback) => {
  try {
    const response = await fetch(`${API_URL}${ingredient}`);
    const json = await response.json();
    callback(json.meals);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    callback([]);
  }
};

export { fetchRecipes };
