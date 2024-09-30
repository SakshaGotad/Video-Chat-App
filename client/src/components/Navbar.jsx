import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { FaGithub } from "react-icons/fa";
const Navbar = () => {
  return (
    <>
    <header>
      <div className="container">
        <div className="logo">
            <NavLink to="/" className="logo-name">VidCallApp</NavLink></div>      
        

       <nav>
        <ul className="nav-links">
            <li><NavLink to="/" className="navbar-link">Home</NavLink></li>
            <li><NavLink to="/about" className="navbar-link">About</NavLink></li>
            <li><NavLink to="/service" className="navbar-link">Service</NavLink></li>
            <li><a href="https://github.com/Mahesh925" className="navbar-link" target="_blank"><FaGithub/></a></li>
        </ul>
       </nav>
       </div>
</header>
    </>
  )
}

export default Navbar
