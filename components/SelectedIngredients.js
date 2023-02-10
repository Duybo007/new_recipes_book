import React from 'react'
import { useSelector } from 'react-redux'
import {  selectAvailableIngres, selectUser } from '../features/search/searchSlice'
import styles from '../styles/SelectedIngredients.module.css'

function SelectedIngredients({selectedOptions, remove, findRecipes, addPantry, clear}) {
  const user = useSelector(selectUser)
  return (
    <div className={styles.selectedIngredients}>
        <h1>Your Ingredients</h1>
        
        <div className={styles.selected}>
          <p>Selected: {selectedOptions.join(', ')}</p>
        </div>
        <div className={styles.selected_buttons}>
          <button 
          className={styles.selectedIngredients_remove}
          onClick={remove}>Remove All
          </button>

          <a href='#recipes'><button 
          onClick={findRecipes}
          className={styles.selectedIngredients_btn}>
            Find Recipe
          </button></a>

          {user? (
            <button 
            onClick={addPantry}
            className={styles.selectedIngredients_btn_pantry}>
              Add to Pantry
            </button>
          ) : (null)}
          <button onClick={clear}>Clear</button>
        </div>
    </div>
  )
}

export default SelectedIngredients