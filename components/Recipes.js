import React from 'react'
import { useSelector } from 'react-redux'
import styles from '../styles/Recipes.module.css'
import { selectRecipesIngre, selectSearch } from '../features/search/searchSlice'
import Card from './Card'


function Recipes({recipes}) {
    const search = useSelector(selectSearch)
    const recipeIngre = useSelector(selectRecipesIngre)
    
    // if(!search || !recipeIngre) return null
  return (
    <div id='recipes' className={styles.recipes_page}>
        <h1>Have Fun Cooking</h1>
        <div className={styles.recipes}>
        {recipes.map((recipe) => (
            <Card key={recipe.id} img={recipe.image} title={recipe.title} id={recipe.id} recipe={recipe}/>
        ))}
        </div>
    </div>
  )
}

export default Recipes