import React, { useState, useContext } from 'react'
import './CSS/SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'buyer'
  });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      alert(err.message || "Registration failed");
    }
  };

  return (
    <div className='sign-up'>
      <h1 className='signup-heading'>SignUp</h1>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <label>UserName</label>
        <input type="text" name="name" placeholder='Enter username' onChange={handleChange} required/>
        <label>E-Mail</label>
        <input type="email" name="email" id="" placeholder='Enter Your Mail' onChange={handleChange} required/>
        {/* <label>WhatsApp Number</label>
        <input type="number" name="whatsapp-number" id="" placeholder='Enter Your WhatsApp Number' /> */}
        <label>Password</label>
        <input type="password" name="password" id="" placeholder='Enter your Password' onChange={handleChange} required/>
        <label>Role</label>
        <select name="role" onChange={handleChange}>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
        </select>
        <button type="submit">SignUp</button>
        <p>Already have an account? <Link to='/login' className='signup-Route'>Login</Link></p>
      </form>
    </div>
  )
}

export default LoginSignUp