import React, { useEffect, useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  // useEffect(() => {
  //   fetch('https://react-hooks-project-1acba-default-rtdb.firebaseio.com/ingredients.json').then(response => {
  //     return response.json()
  //   }).then(responseData => {
  //     const loadedIngredients = [];
  //     for (const key in responseData) {
  //       loadedIngredients.push({
  //         id: key,
  //         title: responseData[key].title,
  //         amount: responseData[key].amount
  //       })
  //     }
  //     setUserIngredients(loadedIngredients);
  //   });
  // }, []); //no array is like component did update, with array, its like component did mount

  // useEffect(() => {
  //   console.log('useEffect loaded with userIngredients')
  // }, [userIngredients])

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-project-1acba-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json'}
    }).then(response => {
      return response.json();
    }).then(responseData => {
      setUserIngredients(prevIngredients => [
        ...prevIngredients, 
        {id: responseData.name, ...ingredient}
      ])
    });
  };

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients);
  },[]);

  const removeIngredientHandler = (ingredientId) => {
    setUserIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== ingredientId))
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={userIngredients}  onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
