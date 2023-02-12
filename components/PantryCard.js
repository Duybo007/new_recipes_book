import React, { useEffect, useState } from 'react'
import styles from '../styles/PantryCard.module.css'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { arrayUnion, doc,  updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { selectUser } from '../features/search/searchSlice';
import { useSelector } from 'react-redux';

function PantryCard({ingredient, ingredientList}) {
    const [amount, setAmount] =useState(ingredient.amount)
    const [adjust, setAdjust] = useState(false)
    const ingreName = ingredient.ingredient

    const add = () => {
        setAmount(amount + 1);
        setAdjust(true)
    };
    const minus = () => {
        if (amount > 1) {
            setAmount(amount - 1);
            setAdjust(true)
        }
    };
    
    const user = useSelector(selectUser)
    const recipeID = doc(db , 'users', `${user?.email}`)
    const updateAmount = async (array, ingredient, newAmount) => {
        let newArray = array.map(item => {
          if (item.ingredient === ingredient) {
            return { ...item, amount: newAmount };
          }
          return item;
        });
        try {
           await updateDoc(recipeID, {
            savedIngredients:newArray})
            console.log("adjusted")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className={styles.pantry_card}>
        <h3>{ingredient.ingredient}</h3>
        <div className={styles.amount}>
            <AiOutlineMinusCircle onClick={minus}/>

            <input 
            id="number" 
            type="number" 
            min="1" 
            onChange={(e)=>setAmount(e.target.value)}
            value={amount} />

            <AiOutlinePlusCircle onClick={add}/>
        </div>
        {adjust? (
            <button 
            onClick={()=> {
                updateAmount(ingredientList,ingreName, amount)
                setAdjust(false)
            }}
            className={styles.adjust}>Adjust</button>
        ): (null)}
        <h2>On hand</h2>
    </div>
  )
}

export default PantryCard