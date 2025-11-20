import React, { createContext, useState } from 'react';

const RecipesContext = createContext({
  recipes: [],
  addRecipe: () => {},
});

const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);

  const addRecipe = (name, ingredients, instructions, image) => {
    setRecipes((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        name,
        ingredients,
        instructions,
        image,
      },
    ]);
  };

  return <RecipesContext.Provider value={{ recipes, addRecipe }}>{children}</RecipesContext.Provider>;
};

const RecipesModule = {
  Provider: RecipesProvider,
  Context: RecipesContext,
};

export default RecipesModule;
