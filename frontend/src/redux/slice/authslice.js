import { createSlice } from "@reduxjs/toolkit";



const authslice = createSlice({
    name : "auth",
    
    initialState:{
        user : localStorage.getItem("userInfo")?
        JSON.parse(localStorage.getItem("userInfo")):null,
        registermessage : null,
    },
    reducers : {
        login(state,action){
            state.user= action.payload
        },
        logout(state){
            state.user= null
        },
        register(state,action){
            state.registermessage = action.payload
        }
    }
})

export const authAction = authslice.actions
export const authReducer = authslice.reducer