import React, { createContext } from 'react';
import useRecipes from '../hooks/useRecipes';

const RecipesContext = createContext({
  recipes: [],
  addRecipe: () => {},
  deleteRecipe: () => {},
  editRecipe: () => {},
});

const RecipesProvider = ({ children }) => {
  const { recipes, addRecipe, deleteRecipe, editRecipe } = useRecipes();

  return <RecipesContext.Provider value={{ recipes, addRecipe, deleteRecipe, editRecipe }}>{children}</RecipesContext.Provider>;
};

const RecipesModule = {
  Provider: RecipesProvider,
  Context: RecipesContext,
};

export default RecipesModule;
