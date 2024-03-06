

export default function HeaderLeft({toggle , setToggle}) {
  return (
    <div className="header_left">
            <div className="header_logo">
                <strong>BLOG</strong>
                <i className="bi bi-pencil"></i>
            </div>
            <div className="header_menu" onClick={()=>setToggle(prev => !prev)}>
                {toggle ? <i className="bi bi-x-lg"></i>: <i className="bi bi-list"></i>}
            </div>
        </div>
  )
}
