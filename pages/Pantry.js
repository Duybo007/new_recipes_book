import { doc, onSnapshot } from 'firebase/firestore'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Nav from '../components/Nav'
import PantryCard from '../components/PantryCard'
import { selectUser } from '../features/search/searchSlice'
import { db } from '../firebase'
import styles from './Pantry.module.css'

function Pantry() {
    const [ingredientList, setIngredientList] =useState([])
    const user = useSelector(selectUser)
    console.log(ingredientList)
    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setIngredientList(doc.data()?.savedIngredients)
        })
    }, [user])
    console.log(ingredientList)
  return (
    <div>
        <Head>
            <title>What's for dinner</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/logo.png" />
        </Head>
        <Nav/>
        <div className={styles.pantry}>
            <div className={styles.pantry_banner}>
                <img src="/pantry.jpg"/>
                <h1>Your Pantry</h1>
            </div>

            <div className={styles.pantry_list}>
                <div className={styles.pantry_list_search}>
                    <input 
                    placeholder='Search my ingredients'
                    />
                </div>

                <div className={styles.pantry_list_card}>
                    {ingredientList?.map((i, index) => (
                        <PantryCard 
                        ingredientList={ingredientList}
                        key={index} 
                        ingredient={i}/>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Pantry