import React, { useEffect, useState, useContext } from 'react'
import './CSS/Buyer.css'
import Item from '../components/Item/Item';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Buyer = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch('http://localhost:5000/api/prices')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className='display-div'>
     {user ? (
        products.length > 0 ? products.map((item, i)=>{
        return <Item key = {i}
        id = {item._id}
        name = {item.commodity}
        category = {item.category || "Vegetable"}
        img = {item.image || "https://placehold.co/300x200?text=No+Image"}
        state_name = {item.state}
        district_name = {item.district}
        price = {item.price}
        phone = {item.phone}
        farmer = {item.sellerName || "Anonymous"}/>
      }) : <p>No products available currently.</p>
     ) : (
      <div style={{width: '100%', textAlign: 'center', padding: '50px'}}>
        <h2>Please Login to view available products</h2>
        <Link to="/login" style={{color: 'blue', textDecoration: 'underline'}}>Login Here</Link>
      </div>
     )}
    </div>
  )
}

export default Buyer