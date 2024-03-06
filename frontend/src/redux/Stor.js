
import {configureStore} from "@reduxjs/toolkit"
import { authReducer } from "./slice/authslice"
import { profileReducer } from "./slice/profilslice"

export const stor = configureStore({
    reducer:{
        auth : authReducer,
        profile : profileReducer,
       
    }
})