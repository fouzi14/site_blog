import PostList from "../../compunents/post/PostList"
import SideBare from "../../compunents/sidebar/SideBare"
import "./posts.css"
import {posts,categories} from "../../dummyData"
import Page from "../../compunents/pagination/Page"
import { useEffect } from "react"



export default function Posts() {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return (
    <>
    <section className="posts">
      <PostList posts={posts} />
      <SideBare categories={categories} />
    </section>
    <Page />
    </>
   
  )
}
