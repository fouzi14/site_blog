import { Link, useParams } from "react-router-dom"
import {posts} from "../../dummyData"
import "./post_details.css"
import { useEffect, useState } from "react"
import {toast , ToastContainer} from "react-toastify"
import AddComment from "../../compunents/comment/AddComment"
import CommentList from "../../compunents/comment/CommentList"
import swal from 'sweetalert';
import UpdatePostModel from "./UpdatePostModel"


export default function Post_Details() {
    const {id} =useParams()
    const [file,setFile]=useState(null)
    const [updatePost , setUpdatePost]=useState(false)
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    const update_image_submit_handler = (e)=>{
        e.preventDefault();
        if(!file) return toast.warning("there is no file ")
    }

    const deletepost=()=>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("post has been deleted!", {
                icon: "success",
              });
            } else {
              swal("somthing went wrong!");
            }
          });
    }

    const post =posts.find(p=>p._id===parseInt(id))
  return (
    
    <section className="post_details">
                <ToastContainer theme="colored" position="top-canter" />

        <div className="post_details_image_wrapper">
            <img src={file ? URL.createObjectURL(file) :  post.image} alt="" className="post_details_image" />
            <form  onSubmit={update_image_submit_handler}  className="upfate_post_image_form">
                <label htmlFor="file" className="update_post_label">
                    <i className="bi bi-image-fill"></i>
                    Select New Image
                </label>
                <input style={{display: 'none'}} 
                type="file" name="file" id="file" 
                onChange={(e)=>setFile(e.target.files[0])}
                />
                <button type="submit">Upload</button>
            </form>
        </div>
        <h1 className="post_details_title">{post.title}</h1>
        <div className="post_details_user_info">
            <img src={post.user.image} alt="" className="post_details_user_image" />
            <div className="post_details_user">
                <strong>
                    <Link to="profil/1" >{post.user.username}</Link>
                </strong>
                <span>{post.createdAt}</span>
            </div>
        </div>
        <p className="post_details_description">
            {post.description}
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa,
             repudiandae quos? Soluta harum a aperiam iusto voluptatum, 
             aliquid voluptatem doloremque quia alias, 
            ratione ut fugiat facilis. Laboriosam autem eos quia.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa,
             repudiandae quos? Soluta harum a aperiam iusto voluptatum, 
             aliquid voluptatem doloremque quia alias, 
            ratione ut fugiat facilis. Laboriosam autem eos quia.
        </p>
        <div className="post_details_icon_wrapper">
        <div>
          <i className="bi bi-hand-thumbs-up"></i>
          <small>{post.likes.length} likes</small>
        </div>
        <div>
          <i  onClick={()=>setUpdatePost(true)} className="bi bi-pencil-square"></i>
          <i onClick={deletepost} className="bi bi-trash-fill"></i>
        </div>
        </div>

        <AddComment/>
        <CommentList/>
        {updatePost && <UpdatePostModel post={post} setUpdatePost={setUpdatePost} />}
    </section>
  )
}
