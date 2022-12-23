import React from 'react'
import styles from '../styles/Ingredients.module.css'

function Ingredients({suggestIngre}) {
  return (
    <div className={styles.ingredients}>
    {suggestIngre?.map((i)=> (
        <label className={styles.main}>{i}
        <input type="checkbox"/>
        <span className={styles.w3docs}></span>
        </label>
    ))}
    </div>
  )
}

export default Ingredients