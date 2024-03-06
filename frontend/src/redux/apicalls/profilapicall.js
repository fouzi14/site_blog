
import axios from "axios"
import { profileAction } from "../slice/profilslice"
export function profilUser(userid){
    return async(dispatch)=>{
        try {
            const {data}= await axios.get(`http://localhost:8000/api/users/profil/${userid}`)
            dispatch(profileAction.setProfile(data))
        } catch (error) {
            console.log(error);
        }
    }
}