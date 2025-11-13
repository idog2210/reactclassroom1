import React from 'react';

import Card from '../UI/Card';
import RecipeItem from './RecipeItem';
import classes from './RecipesList.module.css';

const RecipesList = (props) => {
  return (
    <Card className={classes.recipes}>
      <ul>
        {props.recipes.map((recipe) => (
          <RecipeItem key={recipe.id} recipe={recipe} />
        ))}
      </ul>
    </Card>
  );
};

export default RecipesList;
