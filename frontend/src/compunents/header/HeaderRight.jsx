import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../redux/apicalls/authapicalls';

export default function HeaderRight() {
  const {user} = useSelector(state => state.auth);
  const [dropdown , setDropdown]=useState(false)
  const dispatch = useDispatch()
  const logout =()=>{
    setDropdown(false)
    dispatch(logoutUser())
  }
  return (
    <div className="header_right">
        { user ? 
        
        <>
        <div className="header_right_user_info">
          <span onClick={()=>setDropdown(prev => !prev)}
          className='header_right_user_name'>{user?.username} </span>
          <img src={user?.profilPhoto?.url} alt="" className="header_right_user_photo" />
         


         {
          dropdown && (
            <div className="header_right_dropdown">
            <Link onClick={()=>setDropdown(false)}
            to={`/profil/${user?._id}`} className='header_right_dropdown_item'>
              <i className="bi bi-file-person"></i>
              <span>profil</span>
            </Link>
            <div onClick={logout}
            className="header_right_dropdown_item">
              <i className="bi bi-box-arrow-in-left"></i>
              <span>logout</span>
            </div>
          </div>
          )
         }

        </div>
        </>
        
        :
        
        <>
        <Link to="/login" className="header_right_link">
            <i class="bi bi-box-arrow-in-right"></i>
            <span>Login</span>
            </Link>
            <Link to="/register" className="header_right_link">
            <i class="bi bi-person-plus"></i>
            <span>Regester</span>
            </Link>
        </>

        }
          
        </div>
  )
}
