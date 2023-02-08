import React from 'react'
import styles from '../styles/SelectedIngredients.module.css'

function SelectedIngredients({selectedOptions, remove, findRecipes}) {
  return (
    <div className={styles.selectedIngredients}>
        <h1>Your Ingredients</h1>
        
        <div className={styles.selected}>
          <p>Selected: {selectedOptions.join(', ')}</p>
        </div>
        <div className={styles.selected_buttons}>
          <h2 
          className={styles.selectedIngredients_remove}
          onClick={remove}>Remove All
          </h2>
          <a href='#recipes'><button 
          onClick={findRecipes}
          className={styles.selectedIngredients_btn}>
            Find Recipe
          </button></a>
        </div>
    </div>
  )
}

export default SelectedIngredients