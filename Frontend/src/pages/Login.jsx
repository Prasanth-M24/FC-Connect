import React from "react";
import "./CSS/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
        <h1 className="login-heading">Login</h1>
      <form className="login-form">
        {/* <label>UserName</label>
        <input type="text" name="username" /> */}
        <label>E-Mail</label>
        <input type="text" name="email" id="" placeholder="Enter Your Mail"/>
        <label>Password</label>
        <input type="password" name="whatsapp-number" id="" placeholder="Enter Your Password"/>
        {/* <label>WhatsApp Number</label>
        <input type="number" name="whatsapp-number" id="" /> */}
        <button>Login</button>
        <p>If not have an account? <Link to='/signup' className="Login-Route">SignUp</Link></p>
      </form>
    </div>
  );
};

export default Login;
