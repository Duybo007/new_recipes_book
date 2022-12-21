import React from 'react'
import styles from '../styles/Search.module.css'

function Search() {
  return (
    <div className={styles.search}>
        <div className={styles.search_left}>
            <div className={styles.search_left_top}>
                <img src='/food3.jpg' alt='food'/>
                <div className={styles.search_left_empty}/>
                <div className={styles.search_left_ingre}>
                    <h1>what's in your pantry</h1>
                    <input 
                    placeholder='Search'
                    type='text'/>
                </div>
            </div>
            <div className={styles.search_left_bottom}>
                <div className={styles.search_left_empty}>
                    <img src='/dessert.jpg'/>
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
  )
}

export default Search