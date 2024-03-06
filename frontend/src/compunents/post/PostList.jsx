import PostItem from "./PostItem";
import "./post.css";
export default function PostList({posts}) {
  return (
    <div className="post_list">
        {posts.map(item => <PostItem post={item} key={item._id}/> )}
    </div>
  )
}
