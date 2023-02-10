import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectRecipesIngre, selectSearch } from '../features/search/searchSlice'
import styles from '../styles/Search.module.css'
import Recipes from './Recipes'
import * as XLSX from 'xlsx/xlsx.mjs'
import Ingredients from './Ingredients'
import Popular from './Popular'
import { useRouter } from 'next/router'


// to find similar ingredients from user's input
function getSimilarValues(array, input) {
    let similarValues = [];
    for (let i = 0; i < array.length; i++) {
      let value = array[i]["v"];
      if (value?.includes(input.toLowerCase())) {
        similarValues.push(value);
      }
    }
    return similarValues;
  }
function Search() {
    const searchRecipes = useSelector(selectSearch)
    const recipesIngre = useSelector(selectRecipesIngre)
    const [suggestIngre, setSuggestIngre] = useState()
    const router = useRouter()
    const searchRef =useRef(null)
    // check if recipes or recipesIngre is empty, display if not empty
    const recipesDisplay = searchRecipes?.length > 0 ? searchRecipes : recipesIngre.length > 0 ? recipesIngre : []

    let url = "https://spoonacular.com/application/frontend/downloads/top-1k-ingredients.csv"
    const array =[]
    const [ingre, setIngre] = useState(array)
    
    const readFile = async (e) => {
        const data = await (await fetch(url)).arrayBuffer();
        /* data is an ArrayBuffer */
        const workbook = XLSX.read(data);
        const ingredients = workbook.Sheets.Sheet1
        const res=Object.values(ingredients).map(item => ({
            t: item.t,
            v: item.v
          }))
        const ingresOnly = res.filter((_, i) => i % 2 === 0)
        ingresOnly?.map((i)=>(
            array.push(i.v)
        ))
        setIngre(ingresOnly)
    }
    useEffect(()=>{
        readFile()
    }, [])

    // handle ingredient submit
    const handleSubmit = (e) => {
        e.preventDefault()
        setSuggestIngre(getSimilarValues(ingre, searchRef.current.value))
        router.push('/#ingredients')
    }
  return (
    <div className={styles.search_container}>
        <div className={styles.search_hero_wrapper}>
            <div className={styles.search_hero}>
                <p>Wake Up early,</p>
                <p>Eat Fresh & Healthy</p>
            </div>
            <div className={styles.search_hero_text}>
                <p>Aside from their natural good tase and great crunchy texture alongside wonderful colors and fragrances, eating a large serving of fresh.</p>
            </div>
            <img src='/tomato.jpg'/>
        </div>
        <Popular/>
        {recipesDisplay.length > 0? (
            <Recipes id='recipes' recipes={recipesDisplay}/>
        ): (null)}
        
        <div className={styles.search_ingre}>
            <div className={styles.search_input}>
                <p>Ingredients</p>
                <form onSubmit={handleSubmit} className={styles.search_input_form}>
                    <p>what's in your pantry</p>
                    <input
                    ref={searchRef}
                    placeholder='Search'
                    type='text'/>
                </form>
            </div>
            <img src='/ingre.jpg' alt='ingredient'/>
        </div>
        
        <div>
            {!suggestIngre? (
                <></>
                ) : (
                <Ingredients suggestIngre={suggestIngre}/>
            )}
        </div>
        

    </div>
  )
}

export default Search