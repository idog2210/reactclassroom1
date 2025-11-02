import React, { useState } from 'react';

import AddRecipe from './Components/Recipes/AddRecipe';
import RecipesList from './Components/Recipes/RecipesList';

function App() {
  const [recipesList, setRecipesList] = useState([]);

  const addRecipeHandler = (rName, rIngredients, rInstructions, rImage) => {
    setRecipesList((prevRecipesList) => {
      return [...prevRecipesList, { name: rName, ingredients: rIngredients, instructions: rInstructions, image: rImage, id: Math.random().toString() }];
    });
  };

  return (
    <div>
      <AddRecipe onAddRecipe={addRecipeHandler}></AddRecipe>
      <RecipesList recipes={recipesList}></RecipesList>
    </div>
  );
}

export default App;
