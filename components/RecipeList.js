import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { myRecipes, selectMyRecipe, selectUser } from '../features/search/searchSlice'
import { db } from '../firebase'
import { doc, onSnapshot, updateDoc} from 'firebase/firestore'
import styles from '../styles/RecipeList.module.css'
import Link from 'next/link'
import { AiFillHeart } from 'react-icons/ai';

function RecipeList() {
    const dispatch=useDispatch()
    const [recipes, setRecipes] = useState([])
    const user = useSelector(selectUser)
    useEffect(()=> {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc)=> {
          setRecipes(doc.data()?.savedRecipes)
          dispatch(myRecipes(doc.data()?.savedRecipes))
        })
    }, [user?.email])
    const recipeID = doc(db , 'users', `${user?.email}`)
    const myRecipeList = useSelector(selectMyRecipe)
    const deleteRecipes = async (passedID) => {
      console.log("delete")
      try {
        const res = myRecipeList.filter((recipe)=> recipe.id !== passedID)
        await updateDoc(recipeID, {
          savedRecipes: res
        })
      } catch(err) {
        console.log(err)
      }
    }
  return (
    <div className={styles.modal}>
      <div id="popup-article" className={styles.popup}>
        <div className={styles.popup__container}>
          <a href="#" class={styles.popup__close}>
            <span className="screen-reader"></span>
          </a>  
          <div className={styles.popup__content}>
            {recipes?.map((r, index) => (
              <div key={index} className={styles.recipe_list}>
                <Link key={r.id} href={"/Recipe/"+r.id}><img src={r.img}/>
                <h2>{r.title}</h2></Link>
                <AiFillHeart
                onClick={()=>deleteRecipes(r.id)}
                className={styles.liked}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeList