import React from 'react';

import AddRecipe from './Components/Recipes/AddRecipe';
import RecipesList from './Components/Recipes/RecipesList';
import Recipes from './store/RecipesContext';

function App() {
  return (
    <Recipes.Provider>
      <AddRecipe />
      <RecipesList />
    </Recipes.Provider>
  );
}

export default App;
