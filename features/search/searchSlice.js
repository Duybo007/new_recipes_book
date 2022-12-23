import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name : "user",
    initialState : {
        user: null,
        search: null,
        my_recipes: [],
        modal: null,
        signup: null
    },
    reducers:{
        login : (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null   
        },
        myRecipes: (state, action) => {
            state.my_recipes = action.payload
        },
        openModal: (state, action) => {
            state.modal = action.payload
        },
        closeModal: (state) => {
            state.modal = null
        },
        openSignup: (state, action) => {
            state.signup = action.payload
        },
        openSignin: (state) => {
            state.signup = null
        },
        searchWord: (state, action) => {
            state.search = action.payload
        }
    }
})

export const { login, logout, myRecipes, openModal, closeModal, openSignup, openSignin, searchWord } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export const selectSearch = (state) => state.user.search;

export const selectMyRecipe = (state) => state.user.my_recipes;

export const selectModal = (state) => state.user.modal

export const selectSignup = (state) => state.user.signup

export default userSlice.reducer;