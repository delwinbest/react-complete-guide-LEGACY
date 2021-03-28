import React, { useReducer, useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const ingredientReducer = (currentIngredients, action) => {
  switch(action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [
        ...currentIngredients, 
        action.ingredient
      ]
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Failed case in reducer');
  }
}

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  // const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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
    setIsLoading(true);
    fetch('https://react-hooks-project-1acba-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json'}
    }).then(response => {
      setIsLoading(false);
      return response.json();
    }).then(responseData => {
      // setUserIngredients(prevIngredients => [
      //   ...prevIngredients, 
      //   {id: responseData.name, ...ingredient}
      // ])
      dispatch( { type: 'ADD', ingredient: {id: responseData.name, ...ingredient} } );
    });
  };

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    //setUserIngredients(filteredIngredients);
    dispatch( { type: 'SET', ingredients: filteredIngredients } );
  },[]);

  const removeIngredientHandler = (ingredientId) => {
    setIsLoading(true);
    fetch(`https://react-hooks-project-1acba-default-rtdb.firebaseio.com/ingredients/${ingredientId}`, {
      'method': 'DELETE',
      'headers': { 
        'Content-Type': 'application/json',
        'mode': 'no-cors',
        'Access-Control-Allow-Origin': '*'
      },
      status: '200'
    }).then(response => {
      setIsLoading(false);
      // setUserIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== ingredientId))
      dispatch( { type: 'DELETE', id: ingredientId } );
    }).catch(error => {
      setError(error.message)
      setIsLoading(false);
    });
  };

  const clearError = () => {
    setError(null);
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError} >{error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={userIngredients}  onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
