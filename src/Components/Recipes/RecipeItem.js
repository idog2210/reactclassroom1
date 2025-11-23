import React, { useContext, useState } from 'react';
import Button from '../UI/Button';
import Recipes from '../../store/RecipesContext';
import classes from './RecipesList.module.css';

const { Context } = Recipes;

const RecipeItem = ({ recipe }) => {
  const { deleteRecipe, editRecipe } = useContext(Context);

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(recipe.name);
  const [editedIngredients, setEditedIngredients] = useState([...recipe.ingredients, '']);
  const [editedInstructions, setEditedInstructions] = useState([...recipe.instructions, '']);
  const [editedImageUrl, setEditedImageUrl] = useState(recipe.image);

  const deleteHandler = () => {
    deleteRecipe(recipe.id);
  };

  const startEditHandler = () => {
    setEditedName(recipe.name);
    setEditedIngredients([...recipe.ingredients, '']);
    setEditedInstructions([...recipe.instructions, '']);
    setEditedImageUrl(recipe.image);
    setIsEditing(true);
  };

  const cancelEditHandler = () => {
    setEditedName(recipe.name);
    setEditedIngredients([...recipe.ingredients, '']);
    setEditedInstructions([...recipe.instructions, '']);
    setEditedImageUrl(recipe.image);
    setIsEditing(false);
  };

  const saveEditHandler = () => {
    const trimmedName = editedName.trim();
    if (!trimmedName) {
      return;
    }

    const cleanedIngredients = editedIngredients.map((ingredient) => ingredient.trim()).filter((ingredient) => ingredient !== '');

    const cleanedInstructions = editedInstructions.map((instruction) => instruction.trim()).filter((instruction) => instruction !== '');

    if (cleanedIngredients.length === 0 || cleanedInstructions.length === 0) {
      return;
    }

    editRecipe(recipe.id, {
      name: trimmedName,
      ingredients: cleanedIngredients,
      instructions: cleanedInstructions,
      image: editedImageUrl,
    });

    setIsEditing(false);
  };

  const changeIngredientHandler = (index, value) => {
    setEditedIngredients((prev) => {
      const updated = [...prev];
      updated[index] = value;

      if (index === updated.length - 1 && value.trim() !== '') {
        updated.push('');
      }

      if (value.trim() === '' && updated.length > 1 && index < updated.length - 1) {
        updated.splice(index, 1);
      }
      return updated;
    });
  };

  const changeInstructionHandler = (index, value) => {
    setEditedInstructions((prev) => {
      const updated = [...prev];
      updated[index] = value;

      if (index === updated.length - 1 && value.trim() !== '') {
        updated.push('');
      }

      if (value.trim() === '' && updated.length > 1 && index < updated.length - 1) {
        updated.splice(index, 1);
      }

      return updated;
    });
  };

  const imageChangeHandler = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }
    const url = URL.createObjectURL(file);
    setEditedImageUrl(url);
  };

  return (
    <li className={classes.recipeItem}>
      {isEditing ? <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} /> : <h3>{recipe.name}</h3>}

      <h4>Ingredients</h4>
      {isEditing ? (
        <ul className={classes.editList}>
          {editedIngredients.map((ingredient, index) => (
            <li key={index}>
              <input className={classes.editInput} type="text" value={ingredient} onChange={(e) => changeIngredientHandler(index, e.target.value)} />
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      )}

      <h4>Instructions</h4>
      {isEditing ? (
        <ul className={classes.edtList}>
          {editedInstructions.map((ins, index) => (
            <li key={index}>
              <input className={classes.editInput} type="text" value={ins} onChange={(e) => changeInstructionHandler(index, e.target.value)} />
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          {recipe.instructions.map((ins, index) => (
            <li key={index}>
              {index + 1}. {ins}
            </li>
          ))}
        </ul>
      )}

      {isEditing && (
        <>
          <h4>Image</h4>
          <input type="file" accept="image/*" onChange={imageChangeHandler} />
        </>
      )}

      <img src={editedImageUrl} alt={recipe.name} className={classes.recipeImage} />

      <div className={classes.actions}>
        {isEditing ? (
          <>
            <Button onClick={saveEditHandler}>Save</Button>
            <Button onClick={cancelEditHandler}>Cancel</Button>
            <Button onClick={deleteHandler}>Delete</Button>
          </>
        ) : (
          <>
            <Button onClick={startEditHandler}>Edit</Button>
            <Button onClick={deleteHandler}>Delete</Button>
          </>
        )}
      </div>
    </li>
  );
};

export default RecipeItem;
