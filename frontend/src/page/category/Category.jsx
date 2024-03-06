import { useParams } from "react-router-dom"
import PostList from "../../compunents/post/PostList"
import {posts } from "../../dummyData";
import "./category.css"
import { useEffect } from "react";
export default function Category() {

    const {category}=useParams()
    useEffect(()=>{
    window.scrollTo(0,0)
    },[])
  return (
    <section className="category">
        <h1 className="category_title">Post based on {category}</h1>
        <PostList posts={posts}/>
    </section>
  )
}
