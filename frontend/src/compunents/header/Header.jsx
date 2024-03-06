import { useState } from "react"
import "./header.css"
import HeaderLeft from "./HeaderLeft";
import NavBar from "./NavBar";
import HeaderRight from "./HeaderRight";
export default function Header() {

    const [toggle , setToggle]=useState(false);
  return (
    <header className="header">
        <HeaderLeft toggle = {toggle} setToggle = {setToggle} />
        <NavBar toggle = {toggle} setToggle = {setToggle} />
        <HeaderRight/>
    </header>
  )
}
