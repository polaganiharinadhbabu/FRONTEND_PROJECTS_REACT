
import { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Search recipes using food name
  const searchRecipes = async (e) => {
    e.preventDefault();

    if (!search.trim()) {
      setError("Please enter a food name.");
      return;
    }

    setLoading(true);
    setError("");
    setSelectedRecipe(null);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(search)}`
      );

      const data = await response.json();

      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
        setError("No recipes found. Try another food name.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  // Get full recipe details
  const viewRecipe = async (id) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      const data = await response.json();

      if (data.meals) {
        setSelectedRecipe(data.meals[0]);
      }
    } catch (err) {
      setError("Unable to load recipe details.");
    } finally {
      setLoading(false);
    }
  };

  // Extract ingredients and measurements
  const getIngredients = (recipe) => {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }

    return ingredients;
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Recipe Finder</h1>
        <p>Discover delicious recipes for your next meal!</p>
      </header>

      <form className="search-form" onSubmit={searchRecipes}>
        <input
          type="text"
          placeholder="Search food... e.g. Chicken"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {loading && <p className="message">Loading...</p>}

      {error && <p className="error">{error}</p>}

      {selectedRecipe ? (
        <div className="recipe-details">
          <button
            className="back-btn"
            onClick={() => setSelectedRecipe(null)}
          >
            ← Back to Recipes
          </button>

          <h2>{selectedRecipe.strMeal}</h2>

          <img
            src={selectedRecipe.strMealThumb}
            alt={selectedRecipe.strMeal}
          />

          <p className="category">
            Category: {selectedRecipe.strCategory} |
            Area: {selectedRecipe.strArea}
          </p>

          <h3>Ingredients</h3>

          <ul>
            {getIngredients(selectedRecipe).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>Cooking Instructions</h3>

          <p className="instructions">
            {selectedRecipe.strInstructions}
          </p>

          {selectedRecipe.strYoutube && (
            <a
              href={selectedRecipe.strYoutube}
              target="_blank"
              rel="noreferrer"
              className="youtube-link"
            >
              Watch Cooking Video
            </a>
          )}
        </div>
      ) : (
        <div className="recipe-list">
          {recipes.map((recipe) => (
            <div className="recipe-card" key={recipe.idMeal}>
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
              />

              <div className="recipe-content">
                <h3>{recipe.strMeal}</h3>
                <p>{recipe.strArea}</p>

                <button
                  onClick={() => viewRecipe(recipe.idMeal)}
                >
                  View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && recipes.length === 0 && !error && !selectedRecipe && (
        <p className="message">
          Search for your favourite food to find recipes.
        </p>
      )}
    </div>
  );
}

export default App;
