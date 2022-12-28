import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { myRecipes, selectUser } from '../features/search/searchSlice'
import { db } from '../firebase'
import {updateDoc, doc, onSnapshot} from 'firebase/firestore'

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
  return (
    <div>RecipeList</div>
  )
}

export default RecipeList