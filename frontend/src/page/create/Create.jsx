
import { useState } from "react"
import "./create.css"
import {toast , ToastContainer} from "react-toastify"
export default function Create() {
  const [title , setTitle]=useState("");
  const [description , setDescription]=useState("");
  const [category , setCategory]=useState("");
  const [file , setFile]=useState(null);


  const formSubmitHandler = (e)=>{
    e.preventDefault();
    if(title.trim()==="") return toast.error("Post title is required");
    if(category.trim()==="") return toast.error("Post category is required");
    if(description.trim()==="") return toast.error("Post description is required");
    if(!file) return toast.error("Post file is required");
    const formData = new FormData();
    formData.append("image",file)
    formData.append("title",title)
    formData.append("category",category)
    formData.append("description",description)

    console.log(title,category,description,file);
  }
  
  return (
    <section className="create_post">
      <ToastContainer theme="colored" position="top-center"/>
      <h1 className="create_post_title">
        Create New Post
      </h1>
      <form onSubmit={formSubmitHandler} className="create_new_form">
        <input type="text" 
        placeholder="Post title" 
        className="create_post_input" 
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        />

        <select className="create_post_input"
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
        >
          <option disabled value="">Select A Category</option>
          <option value="music">Music</option>
          <option value="coffee">Coffee</option>
        </select>

        <textarea placeholder="Post description" 
        className="create_post_texterea" 
        rows="5"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        ></textarea>

        <input type="file" name="file" id="file" 
        className="create_post_upload" 
       
        onChange={(e)=>setFile(e.target.files[0])}
        />
        <button type="submit" className="create_post_btn">Create</button>
      </form>
    </section>

  )
}
