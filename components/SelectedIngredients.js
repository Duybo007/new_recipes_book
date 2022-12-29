import React from 'react'
import styles from '../styles/SelectedIngredients.module.css'

function SelectedIngredients({selectedOptions, remove, findRecipes}) {
  return (
    <div className={styles.selectedIngredients}>
        <h2>Your Ingredients</h2>
        <h2 
        className={styles.selectedIngredients_remove}
        onClick={remove}>Remove All</h2>
        <a href='#recipes'><button 
        onClick={findRecipes}
        className={styles.selectedIngredients_btn}>
          Find Recipe
        </button></a>
        <div className={styles.selected}>
          <p>Selected: {selectedOptions.join(', ')}</p>
        </div>
        
        
    </div>
  )
}

export default SelectedIngredients