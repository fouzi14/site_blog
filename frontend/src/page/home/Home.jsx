import PostList from "../../compunents/post/PostList"
import "./home.css"
import {posts , categories} from "../../dummyData";
import SideBare from "../../compunents/sidebar/SideBare";
import { Link } from "react-router-dom";
export default function Home() { 
  return (
    <section className="home">
        <div className="home_hero_header">
            <div className="home_hero_header_layout">
                <h1 className="home_title"> Welcom To Blog</h1>
            </div>
        </div>
        <div className="home_latest_post">Latest posts</div>
        <div className="home_container">
            <PostList posts = {posts.slice(0,3)}/>
            <SideBare categories={categories}/>
        </div>
        <div className="home_see_posts_link">
          <Link to="/posts" className= "home_link">
            See All Posts
          </Link>
        </div>
    </section>
  )
}
