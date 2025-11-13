import classes from './RecipesList.module.css';

const RecipeItem = ({ recipe }) => {
  return (
    <li className={classes.recipeItem}>
      <h3>{recipe.name}</h3>

      <h4>Ingredients</h4>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h4>Instructions</h4>
      <ul>
        {recipe.instructions.map((ins, index) => (
          <li key={index}>
            {index + 1}. {ins}
          </li>
        ))}
      </ul>

      <img src={recipe.image} alt={recipe.name} className={classes.recipeImage} />
    </li>
  );
};

export default RecipeItem;
