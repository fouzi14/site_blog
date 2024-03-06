import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function NavBar({toggle , setToggle}) {
  const {user} = useSelector(state=>state.auth)
  return (
        <div className="header_nav_bar" style={{clipPath : toggle && " polygon(0 0, 100% 0, 100% 100%, 0 100%)"}}>
            <ul className="nav_links">
                <Link to="/" className="nav_link" onClick={()=>setToggle(false)}><i class="bi bi-house"></i>Home</Link>
                <Link to="/posts" className="nav_link" onClick={()=>setToggle(false)}><i class="bi bi-stickies"></i>Posts</Link>

                {
                  user && 
                  <Link to="/posts/create" className="nav_link" onClick={()=>setToggle(false)}><i class="bi bi-journal-plus"></i>Create</Link>

                }

                {
                  user?.isAdmin &&
                  <Link to="/admin-dashboard" className="nav_link" onClick={()=>setToggle(false)}><i class="bi bi-person-check"></i>Admin Dashboard</Link>

                }
            </ul>
        </div>
  )
}
