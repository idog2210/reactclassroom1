import { useState, useEffect } from 'react';

const useRecipes = () => {
  const STORAGE_KEY = 'recipes';

  const [recipes, setRecipes] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }

    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('Failed to parse recipes from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

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

  const deleteRecipe = (id) => {
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
  };

  const editRecipe = (id, updatedFields) => {
    setRecipes((prev) => prev.map((recipe) => (recipe.id === id ? { ...recipe, ...updatedFields } : recipe)));
  };

  return {
    recipes,
    addRecipe,
    deleteRecipe,
    editRecipe,
  };
};

export default useRecipes;
