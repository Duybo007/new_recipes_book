import React, { useState } from 'react'
import styles from '../styles/Footer.module.css'
import { FiMail } from 'react-icons/fi';

function Footer() {
  const [subscribed, setSubscribed] = useState(false)
  return (
    <div className={styles.footer}>
        <div className={styles.footer_wrapper}>
            <h1>Subscribe to get weekly recipe updates</h1>
            {/* <div className={styles.footer_input}>
                <input 
                placeholder='Enter your email here'
                />
                <button>Subscribe</button>
            </div> */}
            <div className={styles.content}>
              <form className={`${styles.subscription} ${subscribed? styles.done : ""}`}>
                <input className={styles.add_email} type="email" placeholder="subscribe@me.now"/>
                <button 
                onClick={() => setSubscribed(true)}
                className={styles.submit_email} type="button">
                  <span className={styles.before_submit}>Subscribe</span>
                  <span className={styles.after_submit}>Thank you for subscribing!</span>
                </button>
              </form>
            </div>
        </div>
    </div>
  )
}

export default Footer