import React from 'react'
import styles from '../styles/Footer.module.css'
import { FiMail } from 'react-icons/fi';

function Footer() {
  return (
    <div className={styles.footer}>
        <div className={styles.footer_wrapper}>
            <h1>Subscribe to get weekly recipe updates</h1>
            <div className={styles.footer_input}>
                <input 
                placeholder='Enter your email here'
                />
                <button>Subscribe</button>
            </div>
        </div>
    </div>
  )
}

export default Footer