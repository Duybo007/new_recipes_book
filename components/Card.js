import React, { useEffect, useState } from 'react'
import styles from '../styles/Card.module.css'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { selectMyRecipe, selectUser } from '../features/search/searchSlice';
import {arrayUnion, doc, updateDoc} from 'firebase/firestore'
import { apiKey, db } from '../firebase'
import Link from 'next/link';
import useSaveRecipe from '../hook/useSaveRecipe';

function Card({img, title, id, recipe}) {

    const [liked, setLiked] = useState(false)
    const quotes = ["First, we eat. Then, we do everything else",
                    "Lifes is uncertain. Eat dessert first",
                    "There’s no we in fries",
                    "I’m on a seafood diet. I see food, I eat it",
                    "Carbs might be my soulmate",
                    "Hunger is a good cook",
                    "People who love to eat are always the best people",
                    "Spread love as thick as you would Nutella",
                    "Patience is the secret to good food",
                    "Don’t be upsetti, eat some spaghetti ",
                    "Good food never fails in bringing people together",
                    "Life is a combination of magic and pasta",
                    "I’m soy into you",
                    "Life is about exploring the pasta-billities",
                    "Let food be thy medicine and medicine be thy food",
                    "One does not need silver cutlery to eat delectable food"]
    function pickRandomItem(items) {
        return items[Math.floor(Math.random() * items.length)];
    }
    const user = useSelector(selectUser)
    const myRecipes = useSelector(selectMyRecipe)
    // const recipeID = doc(db , 'users', `${user?.email}`)
    
    const {savedRecipes, deleteRecipes } = useSaveRecipe(img, title, id);

    // const deleteRecipes = async (passedID) => {
    //   setLiked(false)
    //   try {
    //     const res = myRecipes.filter((recipe)=> recipe.id !== passedID)
    //     await updateDoc(recipeID, {
    //       savedRecipes: res
    //     })
    //   } catch(err) {
    //     console.log(err)
    //   }
    // }
    // const savedRecipes = async () => {
    //   if (user?.email){
    //     setLiked(true)
    //     await updateDoc(recipeID, {
    //       savedRecipes: arrayUnion({
    //         id: id,
    //         title: title,
    //         img: img
    //       })
    //     })
    //     }
    //   }
  useEffect(() => {
      myRecipes?.map((r) => {
        if(r.id === id){
          setLiked(true)
        }
      })
    }, [myRecipes])

  const [recipeInfo,setRecipeInfo] =useState(null)
  useEffect(()=> {
    const getRecipeInfo = async() =>{
      let res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)
      const data = await res.json()
      // console.log(data)
      setRecipeInfo(data)
    }
    getRecipeInfo()
  },[])

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
  return (
   
    <div href="" className={styles.card}>
      <Link  key={id} href={"/Recipe/"+ id}><img src={img} className={styles.card__image} alt="" /></Link>
      <div className={styles.card__overlay}>
        <div className={styles.card__header}>
          <svg className={styles.card__arc} xmlns="http://www.w3.org/2000/svg">
            <path />
          </svg>
          <div className={styles.liked}>
          { user ? (
            liked ? (
              <AiFillHeart onClick={() =>{
                setLiked(false)
                deleteRecipes(id)}} className={styles.liked}/>
            ) : (
              <AiOutlineHeart onClick={savedRecipes} className={styles.liked}/>
            )
            ) : null 
          }
          </div>
          <div className={styles.card__header_text}>
          <Link  key={id} href={"/Recipe/"+ id}><h3 className={styles.card__title}>{title}</h3></Link>
            {recipe.missedIngredientCount? (
              <span className={styles.card__status}>Missing Ingredients: {recipe.missedIngredientCount}</span>
            ) : (
              <>
                <span className={styles.card__status}>Servings: {recipeInfo?.servings} | </span>
                <span className={styles.card__status}>Ready In: {minutesToHoursString(recipeInfo?.readyInMinutes)} </span>
              </>
            ) }
          </div>
        </div>
        <p className={styles.card__description}>{pickRandomItem(quotes)}</p>
      </div>
    </div>
  )
}

export default Card