import React, { useState } from "react";
import app_logo from "../assets/app-logo.png";
import "./Navbar.css";
// import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { BsChatLeftDots } from "react-icons/bs";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menu, setMenu] = useState("buyer")
  return (
    <div className="nav-bar">
      <div className="logo">
        <img src={app_logo} alt="" />
        <div className="name">
          <p>Farmer-Customer</p>
          <p>Connection</p>
        </div>
      </div>
      <ul className="menu">
        <li onClick={()=>{setMenu("buyer")}}><Link style={ {textDecoration: "none", color:"black"} } to={'/'}>Buyer</Link> {menu == "buyer" ? <hr/> : <></>} </li>
        <li onClick={()=>{setMenu("seller")}}><Link style={ {textDecoration: "none", color:"black"} } to='/seller'>Seller</Link> {menu == "seller" ? <hr/> : <></>} </li>
        <li onClick={()=>{setMenu("currentPrice")}}><Link style={ {textDecoration: "none", color:"black"} } to={'/currentPrice'}>Current Price</Link> {menu == "currentPrice" ? <hr/> : <></>} </li>
        <li onClick={()=>{setMenu("weather")}}><Link style={ {textDecoration: "none", color:"black"} } to={'/weather'}>Weather</Link> {menu == "weather" ? <hr/> : <></>} </li>
      </ul>

      {/* <div className="search-bar">
        <input type="text" placeholder="search for farm products..." />
      </div> */}
      {/* <div className="chat">
        <BsChatLeftDots />
      </div> */}
      <div className="login-signup">
        <Link to='/signup'><button onClick={()=>{setMenu("login")}}>SignUp</button></Link>
      </div>
    </div>
  );
};

export default Navbar;
