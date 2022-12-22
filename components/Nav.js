import React, { useState, useRef } from 'react'
import styles from '../styles/Nav.module.css'
import { BiSearchAlt } from 'react-icons/bi';
import { BsFacebook, BsInstagram, BsPinterest } from 'react-icons/bs';
import Sign from './Sign'
import Log from './Log';

function Nav() {
    const [showSearch, setShowSearch] = useState(false);
    const [search,setSearch]=useState("")
    const [openSignup, setOpenSignup] = useState(false)
    const [openSignin, setOpenSignin] = useState(false)
    console.log(openSignup)
    

    const searchRef =useRef(null)
    const searchRecipe = (e) => {
        if( e.key == "Enter"){
            e.preventDefault()
            setSearch(searchRef.current.value)
        }
    }
    const signUp = () =>{
        setOpenSignin(true)
        setOpenSignup(true)
    }
    const onClose = () => {
        setOpenSignin(false)
        setOpenSignup(false)
    }
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
                    <a className={styles.nav_link} onClick={signUp}>Sign Up</a>
                    <a className={styles.nav_link} onClick={()=> setOpenSignin(true)}>Sign In</a>
                    <div className={styles.nav_quote}>
                        <p>don't know what to cook?</p>
                        <p>we have all the answers</p>
                        <p>welcome to our recipe book</p>
                        <p>thousand meals await</p>
                    </div>
            </div>
            <img className={styles.bg_img} src='/food2.png'/>
        </div>
        <Sign open={openSignup} onClose={onClose}/>
        <Log open={openSignin} onClose={onClose} openSignup={openSignup}/>
    </div>
  )
}

export default Nav