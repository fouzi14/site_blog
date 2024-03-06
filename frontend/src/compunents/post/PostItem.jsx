import { Link } from "react-router-dom";

export default function PostItem({post}) {
  return (
    <div className="post_item">
        <div className="post_item_image_wrapper">
            <img src={post.image} alt="" className="post_item_image" />
        </div>
        <div className="post_item_info_wrapper">
            <div className="post_item_info">
                <div className="post_item_auther">
                    <strong>Auther : </strong>
                    <Link className="post_item_username" to = "/profil/1" > {post.user.username}</Link>
                </div>
                <div className="post_item_date">
                    {new Date(post.createdAt).toDateString()}
                </div>
                
            </div>
            <div className="post_item_details">
                <h4 className="post_item_title">{post.title}</h4>
                <Link className="post_item_category" to={`/posts/categories/${post.category}`}>
                    {post.category}
                </Link>
            </div>
            <p className="post_item_description">
                {post.description}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Totam molestiae ut eum aspernatur nemo iusto ea delectus 
                incidunt, porro esse voluptates, quam, quas aliquid aliquam 
                optio officia repellendus id numquam.
            </p>
            <Link className="post_item_link" to={`posts/details/${post._id}`}>
                Read More ...
            </Link>
        </div>
    </div>
  )
}
