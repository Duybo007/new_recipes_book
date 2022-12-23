import React, { useState } from 'react'
import styles from '../styles/Card.module.css'
import { AiFillHeart } from 'react-icons/ai';

function Card({img, title}) {
    const [liked, setLiked] = useState(false)
    const quotes = ["First, we eat. Then, we do everything else",
                    "Lifes is uncertain. Eat dessert first",
                    "There’s no we in fries",
                    "I’m on a seafood diet. I see food, I eat it",
                    "Carbs might be my soulmate",
                    "Hunger is a good cook",
                    "People who love to eat are always the best people",
                    "Spread love as thick as you would Nutella",
                    "Patience is the secret to good food",
                    "Don’t be upsetti, eat some spaghetti ",
                    "Good food never fails in bringing people together",
                    "Life is a combination of magic and pasta",
                    "I’m soy into you",
                    "Life is about exploring the pasta-billities",
                    "Let food be thy medicine and medicine be thy food",
                    "One does not need silver cutlery to eat delectable food"]
    function pickRandomItem(items) {
        return items[Math.floor(Math.random() * items.length)];
    }
  return (
    // <Link className={styles.recipe} key={recipe.id} href={"/Recipe/"+recipe.id}>
    <div className={styles.wrapper}>
        <div className={`${styles.box} ${styles.zoom_in}`}>
            <AiFillHeart onClick={() => setLiked(like => !like)} className={`${liked && styles.liked}`}/>
            <img src={img} alt="Recipes img"/>
            <h2>{title}</h2>
            <p>{pickRandomItem(quotes)}</p>
        </div>
    </div>
    // </Link >
  )
}

export default Card