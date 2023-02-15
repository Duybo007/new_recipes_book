import styles from './Recipe.module.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { apiKey, db } from '../../firebase'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import {BsDownload, BsPrinter } from 'react-icons/bs'
import {GiKnifeFork} from 'react-icons/gi'
import Nav from '../../components/Nav'
import { useSelector } from 'react-redux'
import {  selectUser } from '../../features/search/searchSlice'
import { doc, onSnapshot } from 'firebase/firestore'

function recipe() {
    const router = useRouter()
    const user = useSelector(selectUser)
    const [detail, setDetail]= useState({})
    const [pantryIngredients, setPantryIngredients] =useState([])
    let params = router.query
    const hero = [
        "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
        "https://images.unsplash.com/photo-1605522469906-3fe226b356bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80",
        "https://images.unsplash.com/photo-1671725779253-aa2351eb9271?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        "https://images.unsplash.com/photo-1518291344630-4857135fb581?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80",
        "https://plus.unsplash.com/premium_photo-1661573540859-616d65c2fa68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        "https://images.unsplash.com/photo-1543353071-873f17a7a088?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        "https://images.unsplash.com/photo-1495461199391-8c39ab674295?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
    ]
    function pickRandomItem(items) {
        return items[Math.floor(Math.random() * items.length)];
    }

    const instructions = detail?.instructions?.split('.'); 

    useEffect(()=>{
        if(params.recipe){
        const fetchDetail = async() =>{
            let res = await fetch(`https://api.spoonacular.com/recipes/${params.recipe}/information?apiKey=${apiKey}&includeNutrition=true`)
            const data = await res.json()
            setDetail(data)
        }
        fetchDetail()}
        
    }, [params.recipe])

    function minutesToHoursString(minutes) {
        let hours = Math.floor(minutes / 60);
        let remainingMinutes = minutes % 60;
      
        if (hours === 0) {
          return `${remainingMinutes} min`;
        } else if (remainingMinutes === 0) {
          return `${hours} h`;
        } else {
          return `${hours} h ${remainingMinutes} min`;
        }
    }

    useEffect(() => {
        onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
            setPantryIngredients(doc.data()?.savedIngredients)
        })
    }, [user?.email])

    // check if ingredients in the pantry is available for this recipe
    const sortedPantry = pantryIngredients.sort(function(a, b) {
        if (a.ingredient < b.ingredient) {
            return -1;
        }
        if (a.ingredient > b.ingredient) {
            return 1;
        }
        return 0;
    });
    // sort array of pantry ingredients
    function binarySearchIngre(ingredients, target) {
        let start = 0;
        let end = ingredients.length - 1;
    
        while (start <= end) {
            let middle = Math.floor((start + end) / 2);
            let ingredient = ingredients[middle].ingredient;
    
            if (ingredient === target) {
                return true;
            } else if (ingredient < target) {
                start = middle + 1;
            } else {
                end = middle - 1;
            }
        }
    
        return false;
    }
    // using binary search to check if a target ingredient is in the sorted array
    function binarySearchAmount(ingredients, target, targetAmount) {
        let start = 0;
        let end = ingredients.length - 1;
    
        while (start <= end) {
            let middle = Math.floor((start + end) / 2);
            let ingredient = ingredients[middle];
    
            if (ingredient.ingredient === target && ingredient.amount === targetAmount) {
                return true;
            } else if (ingredient.ingredient < target || (ingredient.ingredient === target && ingredient.amount < targetAmount)) {
                start = middle + 1;
            } else {
                end = middle - 1;
            }
        }
    
        return false;
    }
    // using binary search to check if a target ingredient and amount is in the sorted array

    // function checkIngredient(array, ingredientName) {
    //     for (let i = 0; i < array.length; i++) {
    //       if (array[i].ingredient === ingredientName) {
    //         return true;
    //       }
    //     }
    //     return false;
    // }
    // function checkAmount(array, ingredientName, amountCheck) {
    //     for (let i = 0; i < array.length; i++) {
    //         if (array[i].ingredient === ingredientName && array[i].amount === amountCheck) {
    //           return true;
    //         }
    //       }
    //       return false;
    // }
  return (
    <>
        <Nav/>
        <Head>
            <title>What's for dinner</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/logo.png" />
        </Head>
        <div className={styles.detail}>
            
            <div className={styles.banner}>
                <img src={pickRandomItem(hero)}/>
                <div className={styles.banner_icons}>
                    <div className={styles.banner_icon}><BsPrinter/></div>
                    <div className={styles.banner_icon}><AiOutlineHeart/></div>
                    <div className={styles.banner_icon}><BsDownload/></div>
                </div>
            </div>

            <div className={styles.detail_recipe}>
                <div className={styles.detail_recipe_left}>
                    <div className={styles.summary}>
                        <p dangerouslySetInnerHTML={{__html: detail.summary}}></p>
                    </div>
                    <div className={styles.detail_recipe_ingre}>
                        <div>
                            <h1>Ingredients :</h1>
                        </div>
                        <div>
                            <ol className={styles.ingre_list}>
                            {detail.extendedIngredients?.map((i, index) => (
                                <li key={i.id}>
                                    <div >{i.original} : {i.amount}</div>
                                    {user? (
                                        binarySearchIngre(pantryIngredients, i.name)? (
                                            binarySearchAmount(pantryIngredients, i.name, i.amount)? (
                                                <p className={styles.available}>Available</p>
                                            ) : (
                                                <p className={styles.available}>Available but not enough</p>
                                            )
                                        ) : (
                                            <p className={styles.missing}>Missing</p>
                                        )
                                    ) : (null)}
                                </li>
                            ))}
                            </ol>
                        </div>
                    </div>

                    <div className={styles.detail_recipe_ingre}>
                        <div>
                            <h1>Direction :</h1>
                        </div>
                        <div>
                            <ol className={styles.ingre_list}>
                                {instructions?.slice(0, -1).map((i, index) => (
                                    <li key={index}>{i}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
                
                <div className={styles.detail_recipe_right}>
                    <div className={styles.detail_recipe_name}>
                        <h1>{detail.title}</h1>
                    </div>
                    <div className={styles.detail_recipe_detail}>
                        <ul>
                            <li><GiKnifeFork/> Servings: {detail?.servings}</li>
                            <li><GiKnifeFork/> Ready In: {minutesToHoursString(detail?.readyInMinutes)}</li>
                            <li><GiKnifeFork/> Carbs: {detail?.nutrition?.caloricBreakdown.percentCarbs}%</li>
                            <li><GiKnifeFork/> Fat: {detail?.nutrition?.caloricBreakdown.percentCarbs}%</li>
                            <li><GiKnifeFork/> Protein: {detail?.nutrition?.caloricBreakdown.percentCarbs}%</li>
                        </ul>
                    </div>
                    <div className={styles.detail_recipe_btn}>
                        <button>Nutrition Info</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default recipe

