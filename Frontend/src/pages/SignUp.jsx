import React from 'react'
import './CSS/SignUp.css';
import { Link } from 'react-router-dom';

const LoginSignUp = () => {
  return (
    <div className='sign-up'>
      <h1 className='signup-heading'>SignUp</h1>
      <form className='sign-up-form'>
        <label>UserName</label>
        <input type="text" name="username" placeholder='Enter username'/>
        <label>E-Mail</label>
        <input type="text" name="email" id="" placeholder='Enter Your Mail' />
        <label>WhatsApp Number</label>
        <input type="number" name="whatsapp-number" id="" placeholder='Enter Your WhatsApp Number' />
        <label>Password</label>
        <input type="password" name="password" id="" placeholder='Enter your Password' />
        <button>SignUp</button>
        <p>Already have an account? <Link to='/login' className='signup-Route'>Login</Link></p>
      </form>
    </div>
  )
}

export default LoginSignUp