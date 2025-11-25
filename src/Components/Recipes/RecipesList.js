import React, { useContext } from 'react';

import Card from '../UI/Card';
import RecipeItem from './RecipeItem';
import { RecipesContext } from '../../store/RecipesContext';
import classes from './RecipesList.module.css';

const RecipesList = () => {
  const { recipes } = useContext(RecipesContext);

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
