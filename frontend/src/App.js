import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./compunents/header/Header";
import Home from "./page/home/Home";
import Login from "./page/forms/Login";
import Register from "./page/forms/Register";
import Posts from "./page/posts/Posts";
import Create from "./page/create/Create";
import Admin from "./page/admin/Admin";
import Footer from "./compunents/footer/Footer";
import Post_Details from "./page/post_details/Post_Details";
import Category from "./page/category/Category";
import Profil from "./page/profil/Profil";
import ForgotPassword from "./page/forms/ForgotPassword";
import ResetPassword from "./page/forms/ResetPassword";
import { useSelector } from "react-redux";

function App() {
  const {user}=useSelector(state=>state.auth)
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
        <Route path="/register" element={!user ? <Register/> :<Navigate to="/"/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/rest-pasword" element={<ResetPassword/>}/>
        <Route path="/profil/:id" element={<Profil/>}/>
        <Route path="/posts" element={<Posts/>}/>
        <Route path="/posts/create" element={user ? <Create/> : <Navigate to="/"/>}/>
        <Route path="/posts/details/:id" element={<Post_Details/>}/>
        <Route path="/posts/categories/:category" element={<Category/>}/>
        
        <Route path="/admin-dashboard" element={user?.isAdmin ?<Admin/> :<Navigate to="/"/>}/>
      </Routes>
      <Footer/>

      </BrowserRouter>
    </div>
  );
}

export default App;
