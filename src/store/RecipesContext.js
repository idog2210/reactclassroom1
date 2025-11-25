import React, { createContext } from 'react';
import useRecipes from '../hooks/useRecipes';

export const RecipesContext = createContext({
  recipes: [],
  addRecipe: () => {},
  deleteRecipe: () => {},
  editRecipe: () => {},
});

export const RecipesProvider = ({ children }) => {
  const { recipes, addRecipe, deleteRecipe, editRecipe } = useRecipes();

  return <RecipesContext.Provider value={{ recipes, addRecipe, deleteRecipe, editRecipe }}>{children}</RecipesContext.Provider>;
};
