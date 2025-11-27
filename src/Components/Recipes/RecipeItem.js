import React, { useContext, useState } from 'react';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import { RecipesContext } from '../../store/RecipesContext';
import classes from './RecipesList.module.css';

const RecipeItem = ({ recipe }) => {
  const { deleteRecipe, editRecipe } = useContext(RecipesContext);

  const [error, setError] = useState();
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
    setEditedIngredients([...recipe.ingredients]);
    setEditedInstructions([...recipe.instructions]);
    setEditedImageUrl(recipe.image);
    setIsEditing(false);
  };

  const saveEditHandler = () => {
    const trimmedName = editedName.trim();

    if (!trimmedName) {
      setError({
        title: 'Invalid name',
        message: 'Please enter a recipe name before saving.',
      });
      return;
    }

    const cleanedIngredients = editedIngredients.reduce((acc, ingredient) => {
      const trimmed = ingredient.trim();
      if (trimmed !== '') {
        acc.push(trimmed);
      }
      return acc;
    }, []);

    const cleanedInstructions = editedInstructions.reduce((acc, instruction) => {
      const trimmed = instruction.trim();
      if (trimmed !== '') {
        acc.push(trimmed);
      }
      return acc;
    }, []);

    if (cleanedIngredients.length === 0 || cleanedInstructions.length === 0) {
      setError({
        title: 'Invalid content',
        message: 'Please enter at least one ingredient and one instruction.',
      });
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

  const clearErrorHandler = () => {
    setError(null);
  };

  const updateDynamicList = (prevList, index, value) => {
    const updatedList = [...prevList];
    updatedList[index] = value;

    const cleanedList = updatedList.filter((item) => item.trim() !== '');
    cleanedList.push('');
    return cleanedList;
  };

  const changeIngredientHandler = (index, value) => {
    setEditedIngredients((prev) => updateDynamicList(prev, index, value));
  };

  const changeInstructionHandler = (index, value) => {
    setEditedInstructions((prev) => updateDynamicList(prev, index, value));
  };

  const imageChangeHandler = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError({
        title: 'Invalid file type',
        message: 'Please upload a valid image file.',
      });
      return;
    }

    const url = URL.createObjectURL(file);
    setEditedImageUrl(url);
  };

  return (
    <>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={clearErrorHandler} />}

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
          <ol className={classes.instructionsList}>
            {recipe.instructions.map((ins, index) => (
              <li key={index} className={classes.instructionItem}>
                {ins}
              </li>
            ))}
          </ol>
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
    </>
  );
};

export default RecipeItem;
