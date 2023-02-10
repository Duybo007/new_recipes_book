import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { availableIngres, recipesIngre, searchRecipes, selectAvailableIngres } from '../features/search/searchSlice';
import { apiKey } from '../firebase';
import styles from '../styles/Ingredients.module.css'
import SelectedIngredients from './SelectedIngredients';

function Ingredients({suggestIngre}) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dispatch = useDispatch()

  const handleChange= (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    }
  }
  //if checked, add this ingredient into array selectedOptions

  const RemoveAll = () =>{
    setSelectedOptions([])
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }
  //remove all ingredients

  
  const findRecipes = async() => {
    const ingredients = selectedOptions.join(',')
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&number=16`);
    const data = await response.json();
    dispatch(recipesIngre(data))
    dispatch(searchRecipes([]))
    //empty searchRecipes
  }
  useEffect(() => {
    findRecipes();
  }, []);
  
  const pantry = useSelector(selectAvailableIngres)
  const addPantry = () =>{
    if(selectedOptions.length === 0) return
    const ingreArray = [...pantry,...selectedOptions]
    const ingreSet = new Set(ingreArray)
    // combine 2 array. New array and existing pantry array
    //then convert into Set to eliminate repeat, then turn back into array
    dispatch(availableIngres([...ingreSet]))
  }
  // Add ingredient into pantry
  const clear = ()=>{
    dispatch(availableIngres([]))
  }
  return (
    <div id="ingredients" className={styles.ingredients}>
      <div className={styles.ingredient_list}>
      {suggestIngre?.length> 0? (
        suggestIngre?.map((i)=> (
          <label className={styles.main}>{i}
          <input
            value={i} 
            onChange={handleChange}
            checked={selectedOptions.includes(i)}
            type="checkbox"/>
          <span className={styles.w3docs}></span>
          </label>
          ))
      ) : (<h2 className={styles.not_found}>Not Found</h2>)}
      </div>
    <SelectedIngredients 
    selectedOptions={selectedOptions} 
    remove={RemoveAll} 
    addPantry={addPantry}
    findRecipes={findRecipes}
    clear={clear}/>
    </div>
  )
}

export default Ingredients