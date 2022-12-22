import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name : "user",
    initialState : {
        user: null,
        search: null,
        my_recipes: []
    },
    reducers:{
        login : (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        },
        myRecipes: (state, action) => {
            state.my_movies = action.payload
        }
    }
})

export const { login, logout, myRecipes } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export const selectSearch = (state) => state.user.search;

export const selectMyRecipe = (state) => state.user.my_recipes;

export default userSlice.reducer;