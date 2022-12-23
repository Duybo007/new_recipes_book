import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '../styles/Recipes.module.css'
import { selectSearch } from '../features/search/searchSlice'
import Card from './Card'

function Recipes({recipes}) {
    const search = useSelector(selectSearch)
    if(!search) return null
  return (
    <div id='recipes' className={styles.recipes}>
        {recipes.map((recipe) => (
            <Card key={recipe.id} img={recipe.image} title={recipe.title}/>
        ))}
    </div>
  )
}

export default Recipes