import React, { useContext } from 'react';

import Card from '../UI/Card';
import RecipeItem from './RecipeItem';
import Recipes from '../../store/RecipesContext';
import classes from './RecipesList.module.css';

const { Context } = Recipes;

const RecipesList = () => {
  const { recipes } = useContext(Context);

  return (
    <Card className={classes.recipes}>
      <ul>
        {recipes.map((recipe) => (
          <RecipeItem key={recipe.id} recipe={recipe} />
        ))}
      </ul>
    </Card>
  );
};

export default RecipesList;
