import React, { useState, useContext } from "react";
import "./CSS/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      alert(err.message || "Login failed");
    }
  };

  return (
    <div className="login">
        <h1 className="login-heading">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        {/* <label>UserName</label>
        <input type="text" name="username" /> */}
        <label>E-Mail</label>
        <input type="email" name="email" id="" placeholder="Enter Your Mail" onChange={handleChange} required/>
        <label>Password</label>
        <input type="password" name="password" id="" placeholder="Enter Your Password" onChange={handleChange} required/>
        {/* <label>WhatsApp Number</label>
        <input type="number" name="whatsapp-number" id="" /> */}
        <button type="submit">Login</button>
        <p>If not have an account? <Link to='/signup' className="Login-Route">SignUp</Link></p>
      </form>
    </div>
  );
};

export default Login;
