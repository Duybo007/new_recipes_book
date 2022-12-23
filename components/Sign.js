import React from 'react'
import styles from '../styles/Sign.module.css'

function Sign({open, onClose}) {
	if(!open) return null

  return (
    <div onClick={onClose} className={styles.main}>
			<div onClick={(e)=>{
            e.stopPropagation()
        	}} 
			className={styles.signup}>
				<form>
					<label>Sign Up</label>
					{/* <input type="text" name="txt" placeholder="User name" required=""/> */}
					<input type="email" name="email" placeholder="Email" required=""/>
					<input type="password" name="pswd" placeholder="Password" required=""/>
					<button>Sign up</button>
				</form>
			</div>
	</div>
  )
}

export default Sign