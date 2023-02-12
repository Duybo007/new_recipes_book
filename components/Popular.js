import React, { useEffect, useRef, useState } from 'react'
import { apiKey } from '../firebase'
import styles from '../styles/Popular.module.css'
import Card from './Card'
import {BsArrowRightShort, BsArrowLeftShort, BsInstagram} from 'react-icons/bs'
import Link from 'next/link'

function Popular() {
  const scrollRef = useRef(null)
  const scroll = (direction) => {
    const { current } = scrollRef;
    if(direction === 'left'){
        current.scrollLeft -= 400
    } else {
        current.scrollLeft += 400
    }
  }

  function minutesToHoursString(minutes) {
    let hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;
  
    if (hours === 0) {
      return `${remainingMinutes} min`;
    } else if (remainingMinutes === 0) {
      return `${hours} h`;
    } else {
      return `${hours} h ${remainingMinutes} min`;
    }
  }

  const [popularRecipes, setPopularRecipes] = useState(null)
  useEffect(()=> {
    const getRandomRecipes = async()=>{
      const check = localStorage.getItem("appetizer")
      if(check){
        setPopularRecipes(JSON.parse(check))
      } else {
        const res = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`)
        const data = await res.json()
        localStorage.setItem("appetizer", JSON.stringify(data.recipes))
        setPopularRecipes(data.recipes)
        console.log(data.recipes)
      }      
    }
    getRandomRecipes()
  }, [])
  return (
    <div className={styles.popular}>
        <h1>Popular Food</h1>
        <p>we provide a variety of food and beverage recipes with high taste from famous chefs</p>
        <div className={styles.popular_recipes} >
          <div className={styles.popular_recipes_cards} ref={scrollRef}>
          
            {popularRecipes?.map((recipe) => (
              <div class={styles.a_box} key={recipe.id}>
                <div class={styles.img_container}>
                  <div class={styles.img_inner}>
                    <div class={styles.inner_skew}>
                    <Link key={recipe.id} href={"/Recipe/"+ recipe.id}><img src={recipe.image}/></Link>
                    </div>
                  </div>
                </div>
                <div class={styles.text_container}>
                  <Link key={recipe.id} href={"/Recipe/"+ recipe.id}><h3>{recipe.title}</h3></Link>
                  <div>
                  <span className={styles.card__status}>
                    Servings: {recipe.servings} |
                    Ready In: {minutesToHoursString(recipe.readyInMinutes)}
                  </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.popular_recipes_arrows}>
            <BsArrowLeftShort className={styles.arrow_icon} onClick={()=> scroll('left')}/>
            <BsArrowRightShort className={styles.arrow_icon} onClick={()=> scroll('right')}/>
          </div>
        </div>
    </div>
  )
}

export default Popular