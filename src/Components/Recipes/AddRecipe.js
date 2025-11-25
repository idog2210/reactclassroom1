import React, { useState, useContext } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import DynamicInputList from './DynamicInputList';
import { RecipesContext } from '../../store/RecipesContext';

import classes from './AddRecipe.module.css';

const AddRecipe = () => {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState(['']);
  const [image, setImage] = useState(null);
  const [error, setError] = useState();

  const { addRecipe } = useContext(RecipesContext);

  const addRecipeHandler = (event) => {
    event.preventDefault();
    const trimmedName = recipeName.trim();

    const hasName = trimmedName.length > 0;
    const hasIngredients = ingredients.some((ing) => ing.trim() !== '');
    const hasInstructions = instructions.some((ins) => ins.trim() !== '');
    const hasImage = !!image;

    if (!hasName || !hasIngredients || !hasInstructions || !hasImage) {
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

  const handleDynamicListChange = (event, index, setList) => {
    const newValue = event.target.value;

    setList((prevList) => {
      const updatedList = [...prevList];

      updatedList[index] = newValue;

      const cleanedList = updatedList.filter((item) => item.trim() !== '');
      cleanedList.push('');

      return cleanedList;
    });
  };

  return (
    <div>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
      <Card className={classes.input}>
        <form onSubmit={addRecipeHandler}>
          <label htmlFor="recipeName">Recipe name</label>
          <input id="recipeName" type="text" value={recipeName} onChange={recipeNameChangeHandler} autoComplete="off" />
          <DynamicInputList label="Ingredients" id="ingredients" values={ingredients} onChange={(event, index) => handleDynamicListChange(event, index, setIngredients)} />

          <DynamicInputList label="Instructions" id="instructions" values={instructions} onChange={(event, index) => handleDynamicListChange(event, index, setInstructions)} />
          <label htmlFor="image">Add Image</label>
          <input id="image" type="file" accept="image/*" onChange={(event) => fileHandler(event.target.files && event.target.files[0])}></input>
          <Button type="submit">Add recipe</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddRecipe;
