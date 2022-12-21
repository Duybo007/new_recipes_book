import React from 'react'
import styles from '../styles/Footer.module.css'
import { FiMail } from 'react-icons/fi';

function Footer() {
  return (
    <div className={styles.footer}>
        <div className={styles.footer_left}>
            <p>dinner</p>
        </div>
        <div className={styles.footer_middle}>
                <h2>WEEKLY NEWS SUBSCRIPTION</h2>
                <div className={styles.footer_middle_email}>
                    <FiMail/>
                    <input 
                    placeholder='Email'
                    type='text'/>
                </div>
                <p>
                Here, you will have access to a wide variety of recipes, ranging from quick and easy weeknight dinners to fancy, elaborate dishes for special occasions. We can't wait for you to try them all!
                </p>
        </div>
        <div className={styles.footer_right}>
            <ul>
                <li>Contact</li>
                <li>Newsletters</li>
                <li>Contact</li>
                <li>Advertising</li>
                <li>FAQs</li>
            </ul>
            <ul>
                <li>Expert Advise</li>
                <li>Ingredients</li>
                <li>Contact</li>
                <li>Video</li>
            </ul>
        </div>
    </div>
  )
}

export default Footer