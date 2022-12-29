import React, { useState, useRef } from 'react'
import styles from '../styles/Log.module.css'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {setDoc, doc} from 'firebase/firestore'
import { db } from '../firebase'
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openSignin, openSignup, selectModal, selectSignup } from '../features/search/searchSlice';

function Log() {
	const openModal = useSelector(selectModal)
	const emailRef = useRef(null)
  	const passwordRef = useRef(null)
	const auth = getAuth()

	const register = (e) =>{
		e.preventDefault()
		createUserWithEmailAndPassword(auth,
		  emailRef.current.value,
		  passwordRef.current.value)
		  setDoc(doc(db, 'users', emailRef.current.value), {
			savedRecipes: []
		  })
		.then((authUser) => {
		  console.log(authUser)
		}).catch((error) => {
		  alert(error.message)
		})
		dispatch(closeModal())
	  }
	const signIn = (e) =>{
		e.preventDefault()
		signInWithEmailAndPassword(auth,
		  emailRef.current.value,
		  passwordRef.current.value
		).then((authUser) => {
		  console.log(authUser)
		}).catch((error) => {
		  console.log(error.message)
		})
		dispatch(closeModal())
	  }
	const dispatch = useDispatch()
	const onClose = () =>{ //close modal by set openModal to null in redux
		dispatch(closeModal())
	}

	const signUp = useSelector(selectSignup)
    if(!openModal) return null //only open modal when state of openModal in redux is not null
  return (
    <div onClick={onClose} className={styles.main}>
		<div 
			onClick={(e)=>{
				e.stopPropagation()
				}} 
			className={`${styles.container} ${signUp && styles.right_panel_active}`} id="container">
			<div class={`${styles.form_container} ${styles.sign_up_container}`}>
				<form action="#">
					<h1>Create Account</h1>
					{/* <div class={styles.social_container}>
						<a href="#" class={styles.social}><i class="fab fa-facebook-f"></i></a>
						<a href="#" class={styles.social}><i class="fab fa-google-plus-g"></i></a>
						<a href="#" class={styles.social}><i class="fab fa-linkedin-in"></i></a>
					</div>
					<span>or use your email for registration</span> */}
					{/* <input type="text" placeholder="Name" /> */}
					<input ref={emailRef} type="email" placeholder="Email" />
					<input ref={passwordRef} type="password" placeholder="Password" />
					<button onClick={register}>Sign Up</button>
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
					<input ref={emailRef} type="email" placeholder="Email" />
					<input ref={passwordRef} type="password" placeholder="Password" />
					<a href="#">Forgot your password?</a>
					<button onClick={signIn}>Sign In</button>
				</form>
			</div>
			<div className={styles.overlay_container}>
				<div className={styles.overlay}>
					<div className={`${styles.overlay_panel} ${styles.overlay_left}`}>
						<h1>Welcome Back!</h1>
						<p>To keep connected with us please login with your personal info</p>
						<button className={styles.ghost} id="signIn" onClick={()=> dispatch(openSignin())}>Sign In</button>
					</div>
					<div className={`${styles.overlay_panel} ${styles.overlay_right}`}>
						<h1>Hello, Friend!</h1>
						<p>Enter your personal details and start journey with us</p>
						<button className={styles.ghost} id="signUp" onClick={()=> dispatch(openSignup(true))}>Sign Up</button>
					</div>
				</div>
			</div>
		</div>
    </div>
  )
}

export default Log