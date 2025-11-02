import React from 'react';

import Card from '../UI/Card';
import classes from './RecipesList.module.css';

const RecipesList = (props) => {
  return (
    <Card className={classes.recipes}>
      <ul>
        {props.recipes.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.name}</h3>
            <h4>Ingredients</h4>
            <ul>
              {recipe.ingredients.map((ing, idx) => {
                return <li key={idx}>{ing}</li>;
              })}
            </ul>
            <h4>Instructions</h4>
            <ul>
              {recipe.instructions.map((ins, idx) => (
                <li key={idx}>
                  {idx + 1}. {ins}
                </li>
              ))}
            </ul>
            {recipe.image && <img src={recipe.image} alt={recipe.name} className={classes.recipeImage} />}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default RecipesList;
