import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { recipesIngre, searchRecipes } from '../features/search/searchSlice';
import { apiKey } from '../firebase';
import styles from '../styles/Ingredients.module.css'
import SelectedIngredients from './SelectedIngredients';

function Ingredients({suggestIngre}) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange= (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    }
  }

  const RemoveAll = () =>{
    setSelectedOptions([])
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }

  const dispatch = useDispatch()
  const findRecipes = async() => {
    const ingredients = selectedOptions.join(',')
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&number=16`);
    const data = await response.json();
    dispatch(recipesIngre(data))
    dispatch(searchRecipes([]))
  }
  useEffect(() => {
    findRecipes();
  }, []);
  
  return (
    <div className={styles.ingredients}>
      <div className={styles.ingredient_list}>
      {suggestIngre?.map((i)=> (
        <label className={styles.main}>{i}
        <input
        value={i} 
        onChange={handleChange}
        type="checkbox"/>
        <span className={styles.w3docs}></span>
        </label>
        ))}
      </div>
    <SelectedIngredients selectedOptions={selectedOptions} remove={RemoveAll} findRecipes={findRecipes}/>
    </div>
  )
}

export default Ingredients