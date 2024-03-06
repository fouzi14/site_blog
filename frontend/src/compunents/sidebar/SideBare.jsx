import { Link } from "react-router-dom"
import "./sidebare.css"
export default function SideBare({categories}) {
  return (
    <div className="sidebare">
        <h5 className="sidebare_title">CATEGOTIES</h5>
        <ul className="sidebare_links">
            {categories.map(category=>
                <Link className="sidebare_link" to={`/posts/categories/${category.title}`}>
                    {category.title}
                </Link>
                )}
        </ul>
    </div>
  )
}
