import React, { useState } from 'react'
import styles from '../styles/PantryCard.module.css'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';

function PantryCard({ingredient}) {
    const [amount, setAmount] =useState(ingredient.amount)

    const add = () => {
        setAmount(amount + 1);
    };
    const minus = () => {
        if (amount > 1) {
            setAmount(amount - 1);
        }
    };
  return (
    <div className={styles.pantry_card}>
        <h3>{ingredient.ingredient}</h3>
        <div className={styles.amount}>
            <AiOutlineMinusCircle onClick={minus}/>
            <input 
            id="number" 
            type="number" 
            min="1" 
            value={amount} />
            <AiOutlinePlusCircle onClick={add}/>
        </div>
    </div>
  )
}

export default PantryCard