import React, { useState, useRef, useEffect } from 'react'
import styles from '../styles/Nav.module.css'
import { BiSearchAlt } from 'react-icons/bi';
import { BsFacebook, BsInstagram, BsPinterest } from 'react-icons/bs';
import Log from './Log';
import { login, logout, openModal, openSignin, openSignup, searchWord, selectUser } from '../features/search/searchSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth, signOut } from "firebase/auth";


function Nav() {
    

    
    const [showSearch, setShowSearch] = useState(false);
    const dispatch = useDispatch()
 
    const searchRef =useRef(null)
    const searchRecipe = (e) => {
        if( e.key == "Enter"){
            e.preventDefault()
            dispatch(searchWord(searchRef.current.value))
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
        <div className={styles.nav_left}>
            <div className={styles.nav_left_top}>
                <img src='/food1.jpg' alt='food'/>
                <div className={styles.nav_search}>
                    <div className={styles.nav_search_icon}>
                        <form>
                            <div className={`${styles.search} ${showSearch && styles.show_search}`}>
                                <BiSearchAlt 
                                onClick={() => setShowSearch(true)}
                                onBlur={() => {setShowSearch(false);}}/>
                                <input
                                onKeyPress={searchRecipe}
                                ref={searchRef}
                                type="text"
                                placeholder="Search"
                                onBlur={() => {setShowSearch(false)}}
                            />
                            </div>
                        </form>
                    </div>
                    <div className={styles.nav_search_social}>
                        <BsFacebook/>
                        <BsInstagram/>
                        <BsPinterest/>
                    </div>
                </div>
            </div>
            <div className={styles.nav_left_bottom}>
                <p>what's</p>
            </div>
        </div>
        <div className={styles.nav_right}>
            <div className={styles.nav_right_logo}>
                <img src='/logo.png'/>
            </div>
            <div className={styles.nav_right_log}>
                    {!user ? (
                        <div className={styles.nav_right_log_links}>
                            <a className={styles.nav_link} onClick={signUp}>Sign Up</a>
                            <a className={styles.nav_link} onClick={signIn}>Sign In</a>
                        </div>
                    ) : (
                        <div className={styles.nav_right_log_links}>
                            <a className={styles.nav_link} onClick={() => signOut(auth)}>Sign Out</a>
                            <a className={styles.nav_link} >My Recipes</a>
                        </div>
                    )}
                    
                    <div className={styles.nav_quote}>
                        <p>don't know what to cook?</p>
                        <p>we have all the answers</p>
                        <p>welcome to our recipe book</p>
                        <p>thousand meals await</p>
                    </div>
            </div>
            <img className={styles.bg_img} src='/food2.png'/>
        </div>
        <Log key="recipe"/>
    </div>
  )
}

export default Nav