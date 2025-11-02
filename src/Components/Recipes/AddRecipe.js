import React, { useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';

import classes from './AddRecipe.module.css';

const AddRecipe = (props) => {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState(['']);
  const [image, setImage] = useState(null);
  const [error, setError] = useState();

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

    props.onAddRecipe(
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

  return (
    <div>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
      <Card className={classes.input}>
        <form onSubmit={addRecipeHandler}>
          <label htmlFor="recipeName">Recipe name</label>
          <input id="recipeName" type="text" value={recipeName} onChange={recipeNameChangeHandler} />
          <label htmlFor="ingredients">Ingredients</label>
          {ingredients.map((value, index) => (
            <input
              key={index}
              type="text"
              value={value}
              onChange={(event) => {
                const newIng = [...ingredients];
                const newValue = event.target.value;
                newIng[index] = newValue;
                if (index === ingredients.length - 1 && value.trim() === '' && newValue.trim() !== '') {
                  newIng.push('');
                }

                if (newValue.trim() === '' && ingredients.length > 1) {
                  newIng.splice(index, 1);
                }

                setIngredients(newIng);
              }}
            />
          ))}
          <label htmlFor="instructions">Instructions</label>
          {instructions.map((value, index) => (
            <input
              key={index}
              type="text"
              value={value}
              onChange={(event) => {
                const newIns = [...instructions];
                const newValue = event.target.value;
                newIns[index] = newValue;
                if (index === instructions.length - 1 && value.trim() === '' && newValue.trim() !== '') {
                  newIns.push('');
                }
                if (newValue.trim() === '' && instructions.length > 1) {
                  newIns.splice(index, 1);
                }

                setInstructions(newIns);
              }}
            />
          ))}
          <label htmlFor="image">Add Image</label>
          <input id="image" type="file" accept="image/*" onChange={(event) => fileHandler(event.target.files && event.target.files[0])}></input>
          <Button type="submit">Add recipe</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddRecipe;
