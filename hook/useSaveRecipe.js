import { useDispatch, useSelector } from 'react-redux';
import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { myRecipes, selectMyRecipe, selectUser } from '../features/search/searchSlice';
import { useEffect } from 'react';


function useSaveRecipe(img, title, passedId) {
  const user = useSelector(selectUser);
  const mySavedRecipes = useSelector(selectMyRecipe);
  const recipeID = doc(db, 'users', `${user?.email}`);
  const dispatch = useDispatch()

  useEffect(()=> {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc)=> {
      dispatch(myRecipes(doc.data()?.savedRecipes))
    })
  }, [user?.email])

  const savedRecipes = async () => {
    if (user?.email) {
      await updateDoc(recipeID, {
        savedRecipes: arrayUnion({
          id: passedId,
          title: title,
          img: img,
        }),
      });
      console.log("saved")
    }
  };

  const deleteRecipes = async (passedId) => {
    try {
      const res = mySavedRecipes.filter((recipe) => recipe.id !== passedId);
      await updateDoc(recipeID, {
        savedRecipes: res,
      });
      console.log("deleted")
    } catch (err) {
      console.log(err);
    }
  };

  return {  savedRecipes, deleteRecipes };
}

export default useSaveRecipe;