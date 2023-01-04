import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectRecipesIngre, selectSearch } from '../features/search/searchSlice'
import styles from '../styles/Search.module.css'
import Recipes from './Recipes'
import * as XLSX from 'xlsx/xlsx.mjs'
import Ingredients from './Ingredients'


// to find similar in gredients from user's input
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
    const searchRef =useRef(null)
    const [suggestIngre, setSuggestIngre] = useState()
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
    }
  return (
    <div className={styles.search_container}>
        <Recipes id='recipes' recipes={recipesDisplay}/>
        <div className={styles.search}>
            <div className={styles.search_left}>
                <div className={styles.search_left_top}>
                    <img src='/food3.jpg' alt='food'/>
                    <div className={styles.search_left_empty}/>
                    <form onSubmit={handleSubmit} className={styles.search_left_ingre}>
                        <h1>what's in your pantry</h1>
                        <input
                        ref={searchRef}
                        placeholder='Search'
                        type='text'/>
                    </form>
                </div>
                <div className={styles.search_left_bottom}>
                    <div className={`${styles.search_left_empty_bottom} ${styles.bot}`}>
                        {!suggestIngre? (
                            <img src='/dessert.jpg'/>
                        ) : (
                            <Ingredients suggestIngre={suggestIngre}/>
                        )}
                    </div>
                    <div className={styles.search_left_ingre_list}>
                    
                    
                    </div>
                </div>
            </div>
            <div className={styles.search_middle}>
                <img src='/cream.png'/>
            </div>
            <div className={styles.search_right}>
                <div className={styles.search_right_top}>
                    <p>for dinner</p>
                </div>
                <div className={styles.search_right_bottom}>
                    <img src='/drinks.png'/>
                    <p>Delicious and refreshing cocktail recipes to enjoy any time of year</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Search