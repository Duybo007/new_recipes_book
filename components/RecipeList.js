import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { myRecipes, selectUser } from '../features/search/searchSlice'
import { db } from '../firebase'
import { doc, onSnapshot} from 'firebase/firestore'
import styles from '../styles/RecipeList.module.css'
import Link from 'next/link'

function RecipeList() {
    const dispatch=useDispatch()
    const [recipes, setRecipes] = useState([])
    const user = useSelector(selectUser)
    useEffect(()=> {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc)=> {
          setRecipes(doc.data()?.savedRecipes)
          dispatch(myRecipes(doc.data()?.savedRecipes))
          console.log(doc.data()?.savedRecipes)
        })
    }, [user?.email])
    console.log(recipes)
  return (
    <div>
      <div id="popup-article" className={styles.popup}>
        <div className={styles.popup__container}>
          <a href="#" class={styles.popup__close}>
            <span className="screen-reader"></span>
          </a>  
          <div className={styles.popup__content}>
            {recipes.map((r) => (
              <Link key={r.id} href={"/Recipe/"+r.id}><div className={styles.recipe_list}>
                <img src={r.img}/>
              </div></Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeList