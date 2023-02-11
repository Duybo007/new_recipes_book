import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { recipesIngre, searchRecipes, selectUser } from '../features/search/searchSlice';
import { apiKey, db } from '../firebase';
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
  

  const user = useSelector(selectUser)
  const recipeID = doc(db , 'users', `${user?.email}`)

  const addPantry = async() =>{
    if(selectedOptions.length === 0) return
    const ingreArray = [...selectedOptions]
    const ingreSet = new Set(ingreArray)
    // combine 2 array. New array and existing pantry array
    //then convert into Set to eliminate repeat, then turn back into array
    for (const item of ingreSet) {
      await updateDoc(recipeID, {
        savedIngredients: arrayUnion({
              ingredient: item,
              amount: 1
            })
      });
    }
  }
  // Add ingredient into pantry
  
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
    findRecipes={findRecipes}/>
    </div>
  )
}

export default Ingredients