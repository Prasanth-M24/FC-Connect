import React from 'react'
import './CSS/Buyer.css'
import Item from '../components/Item/Item';
import agri_products from '../components/assets/all_agri_product'
const Buyer = () => {
  return (
    <div className='display-div'>
     {agri_products.map((item, i)=>{
      return <Item key = {i}
      id = {item.id}
      name = {item.name}
      category = {item.category}
      img = {item.img}
      state_name = {item.state}
      district_name = {item.district}
      price = {item.price}
      phone = {item.phone}
      farmer = {item.farmer}/>
     })}
    </div>
  )
}

export default Buyer