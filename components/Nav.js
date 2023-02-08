import React, { useState, useRef, useEffect } from 'react'
import styles from '../styles/Nav.module.css'
import { BiSearchAlt } from 'react-icons/bi';
import Log from './Log';
import { login, logout, openModal, openSignin, openSignup, searchRecipes, searchWord, selectUser } from '../features/search/searchSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth, signOut } from "firebase/auth";
import { apiKey } from '../firebase'
import { useRouter } from 'next/router';
import Link from 'next/link';

function Nav() {
    const dispatch = useDispatch()
    const searchRef =useRef(null)
    const router = useRouter()

    const searchRecipe = async(e) => {
        if( e.key == "Enter"){
            e.preventDefault()
            const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=16&query=${searchRef.current.value}`)
            const recipeDatas = await data.json()
            dispatch(searchRecipes(recipeDatas.results))
            router.push('/#recipes')
        }
    }
    const signUp = () =>{
        dispatch(openModal(true))
        dispatch(openSignup(true))
    }
    const signIn = () => {
        dispatch(openModal(true))
        dispatch(openSignin())
    }
    const user = useSelector(selectUser)
    const auth = getAuth();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
          if (userAuth){
            //Login
            dispatch(login({
              uid: userAuth.uid,
              email: userAuth.email
            }))
          } else {
            //Logout
            dispatch(logout())
          }
        })
        return unsubscribe
      }, [dispatch])

  return (
    <div className={styles.nav}>
        <div className={styles.nav_logo}>
            <Link href={"/"}><img src='/logo.png'/></Link>
        </div>
        
        <ul className={styles.nav_links}>
            <li><a href="#">Recipes</a></li>
            <li><a href="#">Cuisines</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">News</a></li>
        </ul>
        <form>
            <div className={styles.nav_search}>
                    <BiSearchAlt/>
                    <input
                    onKeyPress={searchRecipe}
                    ref={searchRef}
                    type="text"
                    placeholder="Search"
                    />
            </div>
        </form>
            {!user ? (
                        <div className={styles.nav_right_log_links}>
                            <a className={styles.nav_link} onClick={signUp}>Sign Up</a>
                            <a className={styles.nav_link} onClick={signIn}>Sign In</a>
                        </div>
                    ) : (
                        <div className={styles.nav_right_log_links}>
                            <a className={styles.nav_link} onClick={() => signOut(auth)}>Sign Out</a>
                            <a href='#popup-article' className={styles.nav_link} >My Recipes</a>
                        </div>
            )}

        <Log key="recipe"/>
    </div>
  )
}

export default Nav