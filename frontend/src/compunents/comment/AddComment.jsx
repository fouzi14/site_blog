import "./addcomment.css"
import { useState } from "react"
import {toast , ToastContainer} from "react-toastify"


export default function AddComment() {
    const [text , setText]= useState("")
    const addcomment=(e)=>{
        e.preventDefault();
        if(text.trim()==="") return toast.error("please write somthing")
    }
  return (
    <form  onSubmit={addcomment} className="add_comment">
        <input type="text" 
        className="add_comment_input" 
        placeholder="Add a Comment"
        onChange={(e)=>{setText(e.target.value)}}
        />

        <button type="submit" 
        className="add_comment_btn">
            Comment
            </button>
    </form>
  )
}
