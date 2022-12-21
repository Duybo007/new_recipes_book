import React, { useState } from 'react'
import styles from '../styles/Nav.module.css'
import { BiSearchAlt } from 'react-icons/bi';
import { BsFacebook, BsInstagram, BsPinterest } from 'react-icons/bs';

function Nav() {
    const [showSearch, setShowSearch] = useState(false);
    const [search,setSearch]=useState("")
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
                                onChange={(e)=>{setSearch(e.target.value)}}
                                value={search}
                                // onKeyPress={searchMovie}
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
                    <a className={styles.nav_link}>Sign Up</a>
                    <a className={styles.nav_link}>Log In</a>
                    <div className={styles.nav_quote}>
                        <p>don't know what to cook?</p>
                        <p>we have all the answers</p>
                        <p>welcome to our recipe book</p>
                        <p>thousand meals await</p>
                    </div>
            </div>
            <img className={styles.bg_img} src='/food2.png'/>
        </div>
    </div>
  )
}

export default Nav