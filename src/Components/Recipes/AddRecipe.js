import React, { useState, useContext } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import DynamicInputList from './DynamicInputList';
import Recipes from '../../store/RecipesContext';

import classes from './AddRecipe.module.css';

const { Context } = Recipes;

const AddRecipe = () => {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState(['']);
  const [image, setImage] = useState(null);
  const [error, setError] = useState();

  const { addRecipe } = useContext(Context);

  const addRecipeHandler = (event) => {
    event.preventDefault();
    if (recipeName.trim().length === 0 || ingredients.filter((s) => s.trim() !== '').length === 0 || instructions.filter((s) => s.trim() !== '').length === 0 || !image) {
      setError({
        title: 'Invalid Input',
        message: 'Please fill all the input fields: Name, Ingredients, Instructions and Image.',
      });
      return;
    }

    if (!image.type.startsWith('image/')) {
      setError({
        title: 'Invalid file type',
        message: 'Please upload a valid image file',
      });
      return;
    }

    addRecipe(
      recipeName,
      ingredients.filter((s) => s.trim() !== ''),
      instructions.filter((s) => s.trim() !== ''),
      URL.createObjectURL(image)
    );

    setRecipeName('');
    setIngredients(['']);
    setInstructions(['']);
    setImage(null);
    event.target.reset();
  };

  const recipeNameChangeHandler = (event) => {
    setRecipeName(event.target.value);
  };

  const fileHandler = (file) => {
    setImage(file);
  };

  const errorHandler = () => {
    setError(null);
  };

  const handleIngredientChange = (event, index) => {
    const newIng = [...ingredients];
    const newValue = event.target.value;

    newIng[index] = newValue;

    if (index === ingredients.length - 1 && newValue !== '') {
      newIng.push('');
    }
    if (newValue.trim() === '' && ingredients.length > 1) {
      newIng.splice(index, 1);
    }

    setIngredients(newIng);
  };

  const handleInstructionChange = (event, index) => {
    const newList = [...instructions];
    const newValue = event.target.value;

    newList[index] = newValue;
    if (index === instructions.length - 1 && newValue.trim() !== '') {
      newList.push('');
    }
    if (newValue.trim() === '' && instructions.length > 1) {
      newList.splice(index, 1);
    }

    setInstructions(newList);
  };

  return (
    <div>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
      <Card className={classes.input}>
        <form onSubmit={addRecipeHandler}>
          <label htmlFor="recipeName">Recipe name</label>
          <input id="recipeName" type="text" value={recipeName} onChange={recipeNameChangeHandler} autoComplete="off" />
          <DynamicInputList label="Ingredients" id="ingredients" values={ingredients} onChange={handleIngredientChange} />

          <DynamicInputList label="Instructions" id="instructions" values={instructions} onChange={handleInstructionChange} />
          <label htmlFor="image">Add Image</label>
          <input id="image" type="file" accept="image/*" onChange={(event) => fileHandler(event.target.files && event.target.files[0])}></input>
          <Button type="submit">Add recipe</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddRecipe;
