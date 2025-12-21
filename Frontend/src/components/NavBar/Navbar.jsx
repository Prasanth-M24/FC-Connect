import React, { useState, useContext } from "react";
import app_logo from "../assets/app-logo.png";
import "./Navbar.css";
// import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { BsChatLeftDots } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi"; // Added mobile icons
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [menu, setMenu] = useState("buyer");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Added state
  const { user, logout } = useContext(AuthContext);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMenuClick = (menuItem) => {
    setMenu(menuItem);
    setMobileMenuOpen(false); // Close menu on click
  };

  return (
    <div className="nav-bar">
      <div className="logo">
        <Link to="/" onClick={() => handleMenuClick("buyer")} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
          <img src={app_logo} alt="" />
          <div className="name">
            <p>Farmer-Customer</p>
            <p>Connection</p>
          </div>
        </Link>
      </div>

      <div className={`menu-container ${mobileMenuOpen ? 'active' : ''}`}>
        <ul className="menu">
          <li onClick={() => handleMenuClick("buyer")}>
            <Link style={{ textDecoration: "none", color: "inherit" }} to={'/'}>Buyer</Link>
            {menu === "buyer" ? <hr /> : <></>}
          </li>
          <li onClick={() => handleMenuClick("seller")}>
            <Link style={{ textDecoration: "none", color: "inherit" }} to='/seller'>Seller</Link>
            {menu === "seller" ? <hr /> : <></>}
          </li>
          <li onClick={() => handleMenuClick("listings")}>
            <Link style={{ textDecoration: "none", color: "inherit" }} to={'/listings'}>MyProducts</Link>
            {menu === "listings" ? <hr /> : <></>}
          </li>
          <li onClick={() => handleMenuClick("currentPrice")}>
            <Link style={{ textDecoration: "none", color: "inherit" }} to={'/currentPrice'}>Current Price</Link>
            {menu === "currentPrice" ? <hr /> : <></>}
          </li>
          <li onClick={() => handleMenuClick("weather")}>
            <Link style={{ textDecoration: "none", color: "inherit" }} to={'/weather'}>Weather</Link>
            {menu === "weather" ? <hr /> : <></>}
          </li>
        </ul>
        
        <div className="login-signup">
          {user ? (
            <div className="user-info">
              <span>Hi, {user.name}</span>
              <button 
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to='/signup' onClick={() => handleMenuClick("login")}>
              <button>SignUp</button>
            </Link>
          )}
        </div>
      </div>

      <div className="mobile-toggle" onClick={toggleMobileMenu}>
        {mobileMenuOpen ? <HiX size={30} /> : <HiMenu size={30} />}
      </div>
    </div>
  );
};

export default Navbar;
