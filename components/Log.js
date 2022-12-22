import React, { useState } from 'react'
import styles from '../styles/Log.module.css'

function Log({open, onClose, openSignup}) {
    const [signup, setSignup] = useState(openSignup)
    console.log(openSignup)
    console.log(signup)
    if(!open) return null
  return (
    <div onClick={onClose} className={styles.main}>
<div 
onClick={(e)=>{
    e.stopPropagation()
    }} 
className={`${styles.container} ${signup && styles.right_panel_active}`} id="container">
	<div class={`${styles.form_container} ${styles.sign_up_container}`}>
		<form action="#">
			<h1>Create Account</h1>
			{/* <div class={styles.social_container}>
				<a href="#" class={styles.social}><i class="fab fa-facebook-f"></i></a>
				<a href="#" class={styles.social}><i class="fab fa-google-plus-g"></i></a>
				<a href="#" class={styles.social}><i class="fab fa-linkedin-in"></i></a>
			</div>
			<span>or use your email for registration</span> */}
			<input type="text" placeholder="Name" />
			<input type="email" placeholder="Email" />
			<input type="password" placeholder="Password" />
			<button>Sign Up</button>
		</form>
	</div>
	<div className={`${styles.form_container} ${styles.sign_in_container}`}>
		<form action="#">
			<h1>Sign in</h1>
			{/* <div class={styles.social_container}>
				<a href="#" class={styles.social}><i className="fab fa-facebook-f"></i></a>
				<a href="#" class={styles.social}><i className="fab fa-google-plus-g"></i></a>
				<a href="#" class={styles.social}><i className="fab fa-linkedin-in"></i></a>
			</div>
			<span>or use your account</span> */}
			<input type="email" placeholder="Email" />
			<input type="password" placeholder="Password" />
			<a href="#">Forgot your password?</a>
			<button>Sign In</button>
		</form>
	</div>
	<div className={styles.overlay_container}>
		<div className={styles.overlay}>
			<div className={`${styles.overlay_panel} ${styles.overlay_left}`}>
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button className={styles.ghost} id="signIn" onClick={()=> setSignup(false)}>Sign In</button>
			</div>
			<div className={`${styles.overlay_panel} ${styles.overlay_right}`}>
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button className={styles.ghost} id="signUp" onClick={()=> setSignup(true)}>Sign Up</button>
			</div>
		</div>
	</div>
</div>
    </div>
  )
}

export default Log