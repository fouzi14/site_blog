
import axios from "axios"
import { authAction } from "../slice/authslice"
export function loginUser(user){
    return async(dispatch)=>{
        try {
            const {data}=await axios.post("http://localhost:8000/api/auth/login",user)
            dispatch(authAction.login(data))
            localStorage.setItem("userInfo",JSON.stringify(data))
        } catch (error) {
            console.log(error);
        }
    }
}


export function logoutUser(){
    return (dispatch)=>{
        dispatch(authAction.logout())
        localStorage.removeItem('userInfo')
    }
}

export function registerUser(user){
    return async(dispatch)=>{
        try {
            const {data}=await axios.post("http://localhost:8000/api/auth/register",user)
            dispatch(authAction.register(data.message))
        } catch (error) {
            console.log(error);
        }
    }
}
