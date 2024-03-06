import "./profil.css"
import PostList from "../../compunents/post/PostList"
import {posts , categories} from "../../dummyData";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { profilUser } from "../../redux/apicalls/profilapicall";
import { useParams } from "react-router-dom";
export default function Profil() {
    const dispatch = useDispatch()
    const {id}=useParams()
    const {profile} = useSelector(state =>state.profile)
    const[file,setFile]=useState(null)
    useEffect(()=>{
        dispatch(profilUser(id))
        window.scrollTo(0,0)
        
    },[id])
  return (
    <section className="Profil">
        <div className="profil_header">
            <div className="prfil_image_wrapper">
                <img src={file ? URL.createObjectURL(file) :profile?.profilPhoto?.url} alt="" className="profil_image" />
                <form >
                    <abbr title="choose profil photo">
                        <label htmlFor="file" 
                        className="bi bi-camera-fill upload_profil_photo_icon"></label>
                    </abbr>
                    <input style={{display:"none"}} type="file" 
                    name="file" id="file"
                    onChange={(e)=>setFile(e.target.files[0])}
                    />
                    <button type="submit" className="upload_profil_photo_btn">Upload</button>
                </form>
            </div>
            <h1 className="profil_username">{profile?.username}</h1>
            <p className="profil_bio">
                {profile?.bio}
            </p>
            <div className="user_date_joined">
                <strong>Date Joined : </strong>
                <span>{new Date(profile?.createdAt).toDateString()}</span>
            </div>
            <button className="profil_update_btn">
                <i className="bi bi-file-person-fill"></i>
                Update Profil
            </button>
        </div>
        <div className="profil_post_list">
            <h1 className="profile-posts-list-title ">{profile?.username}</h1>
            <PostList posts={posts}/>
        </div>
        <button className="delete_acount_btn">
            delete your account
        </button>
    </section>
  )
}
