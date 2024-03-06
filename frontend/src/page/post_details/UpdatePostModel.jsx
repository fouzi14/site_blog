
import { useState } from "react"
import "./updatepostmodel.css"
export default function UpdatePostModel({setUpdatePost,post}) {
    const [title , setTitle]=useState(post.title)
    const [description , setDescription]=useState(post.description)
    const [category , setCategory]=useState(post.category)

  return (
    <div className="update_post">
        <form  className="update_post_form">
            <abbr title="close">
                <i onClick={()=>setUpdatePost(false)} className="bi bi-x-circle-fill update_post_form_close"></i>
            </abbr>
            <h1 className="update_post_title">Update Post</h1>
            <input type="text" className="update_post_input" 
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
            <select className="update_post_input"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            >
                <option disabled value="">Select A category</option>
                <option value="music">Music</option>
                <option value="coffee">Coffee</option>
            </select>
            <textarea className="update_post_texterea" rows="5"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            ></textarea>
            <button type="submit" className="update_post_btn">Update Post</button>
        </form>
    </div>
  )
}
