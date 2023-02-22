import React, { useState, useRef, useEffect } from 'react'
import styles from '../styles/Nav.module.css'
import { BiSearchAlt } from 'react-icons/bi';
import {AiOutlineMenu} from "react-icons/ai"
import {MdOutlineRestaurantMenu} from "react-icons/md"
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

    //Navbar opacity 100% when scroll down
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        if (window.pageYOffset > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    //Navbar phone
    const [active, setActive] = useState(false)
  return (
    <div className={`${styles.nav} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={styles.nav_logo}>
            <Link href={"/"}><img src='/logo.png'/></Link>
        </div>
        
        <ul className={styles.nav_links}>
            <li><a href="#">Recipes</a></li>
            <li><a href="#">Cuisines</a></li>
            {user? (
                <li><a href="/Pantry">Pantry</a></li>
            ): (null)}
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

        <AiOutlineMenu onClick={()=>setActive(true)} className={styles.btn}/>
        <div className={`${styles.wrapper} ${active? styles.active : ""}`}>
            <MdOutlineRestaurantMenu className={`${styles.btn} ${styles.close}`}  onClick={()=>setActive(false)}/>
            <ul className={styles.links_small}>
                <li onClick={()=>setActive(false)} className='p__opensans'><a href="#about">Recipes</a></li>
                <li onClick={()=>setActive(false)} className='p__opensans'><a href="#skills">Cuisines</a></li>
                <li onClick={()=>setActive(false)} className='p__opensans'><a href="/Pantry">Pantry</a></li>
                <li onClick={()=>setActive(false)} className='p__opensans'><a href="#contact">News</a></li>
                {!user ? (
                        <>
                            <li onClick={()=>{
                                setActive(false)
                                signUp()}}>Sign Up</li>
                            <li onClick={()=>{
                                setActive(false)
                                signIn()}}>Sign In</li>
                        </>
                    ) : (
                        <>
                            <li onClick={() => {
                                setActive(false)
                                signOut(auth)}}>Sign Out</li>
                            <li onClick={()=>setActive(false)}
                            ><a href='#popup-article'>My Recipes</a></li>
                        </>
                )}
            </ul>
        </div>

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