import React from "react";
import "./Item.css";
import location_icon from '../assets/location_icon.png'

const Item = (props) => {

  return (
    <>
      <div className="item">
        <img src={props.img} alt={props.name} className="product-image" />
        <p>{props.name}</p>
        <div className="item-price">₹{props.price} /- Kg</div>
        <div className="product-location"><img src={location_icon} style={{width: '25px'}} alt="" /> {props.district_name}, {props.state_name}
        </div>
        <p>Farmer Name: {props.farmer}</p>
        <button
          className="call-button"
          onClick={() => {
            const message = `Hello, I am interested in your product "${props.name}". I have seen this from FC-Connect`;
            window.open(
              `https://wa.me/+91${props.phone}?text=${encodeURIComponent(message)}`,"_blank"
            );
          }}
        >
          Chat with Buyer
        </button>
      </div>
    </>
  );
};

export default Item;
