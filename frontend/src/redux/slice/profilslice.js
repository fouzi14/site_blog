import { createSlice } from "@reduxjs/toolkit";
const profileslice = createSlice({
    name : "profile",
    
    initialState:{
       profile : null,
    },
    reducers : {
        setProfile(state,action){
            state.profile = action.payload;
        }
    }
})

export const profileAction = profileslice.actions
export const profileReducer = profileslice.reducer