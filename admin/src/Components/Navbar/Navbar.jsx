import React from 'react'
import "./Navbar.css"
import navlogo from "../../assets/nav-logo 1 1.svg"
import navProfile from "../../assets/nav-profile.svg"
const Navbar = () => {
  return (
    <div className ="navbar">
      <img src={navlogo} alt="" className="nav-logo 1 1" />
      <img src ={navProfile} className='nav-profile' alt =""/>
    </div>
  )
}

export default Navbar
