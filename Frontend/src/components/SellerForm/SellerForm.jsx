import React, { useState, useContext } from "react";
import "./SellerForm.css";
import seller_left_image from "../assets/seller_left_image.jpeg";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const SellerForm = () => {
  const [formData, setFormData] = useState({
    commodity: '',
    quantity: '',
    unit: '',
    state: '',
    district: '',
    sellerName: '',
    phone: '',
    price: '',
    image: ''
  });
  const [preview, setPreview] = useState(null);
  
  // Basic image handling (just preview for now, not uploading to server in this simple version)
  
  
  const token = localStorage.getItem('token'); 
  const { user } = useContext(AuthContext);

  if (!user && !token) {
    return (
      <div className="formPageContainer" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <h2>Please Login to Sell Products</h2>
          <Link to="/login"><button style={{padding: '10px 20px', marginTop: '20px', cursor: 'pointer'}}>Login Now</button></Link>
      </div>
    );
  } 

  const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => {
          setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch('http://localhost:5000/api/prices', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(formData)
          });
          
          if(response.ok) {
              alert("Listing Created Successfully!");
              setFormData({
                commodity: '',
                quantity: '',
                unit: '',
                state: '',
                district: '',
                sellerName: '',
                phone: '',
                price: '',
                image: ''
              });
              setPreview(null);
          } else {
              const data = await response.json();
              alert(data.message || "Failed");
          }
      } catch (err) {
          alert("Error connecting to server");
      }
  }

  const triggerFileInput = () => {
    document.getElementById("imageInputId").click();
  };
  return (
    <div className="formPageContainer">
      <div className="left-seller-image">
        {/* <h1 className="form-left-heading">Required Information</h1> */}
        <img src={seller_left_image} alt="" />
      </div>
      <div className="right_seller">
        <div className="seller-form">
          <form onSubmit={handleSubmit}>
            <h1>Required Information</h1>
            <div className="comodityName">
              <label>Comodity Name</label>
              <input type="text" id="comodityName" placeholder="eg. Tomato" name="commodity" value={formData.commodity} onChange={handleChange} required/>
            </div>
            <div className="comodityName">
              <label>Price (per Unit)</label>
              <input type="number" placeholder="eg. 50" name="price" value={formData.price} onChange={handleChange} required/>
            </div>
            <div className="quantity-unit">
              <div className="quantity">
                <label>Quantity</label>
                <input type="number" placeholder="eg. 100" name="quantity" value={formData.quantity} onChange={handleChange}/>
              </div>
              <div className="unit">
                <label>Unit</label>
                <select name="unit" id="" value={formData.unit} onChange={handleChange}>
                  <option value="">Select one</option>
                  <option value="Kg">Kg</option>
                  <option value="MT">MT</option>
                  <option value="Quintal">Quintal</option>
                  <option value="Ton">Ton</option>
                </select>
              </div>
            </div>
            <div className="location-detail">
              <div className="state">
                <label>State</label>
                <input type="text" placeholder="eg. Tamil Nadu" name="state" value={formData.state} onChange={handleChange}/>
              </div>
              <div className="district">
                <label>District</label>
                <input type="text" placeholder="eg. Salem" name="district" value={formData.district} onChange={handleChange}/>
              </div>
            </div>
            <div className="image-detail">
              <div className="image-upload">
                <input
                  type="file"
                  accept="image/*"
                  id="imageInputId"
                  style={{ display: "none" }}
                  onChange={handleInput}
                  name="comodity Image"
                />
              </div>
              <div
                onClick={triggerFileInput}
                style={{
                  border: "1px dashed green",
                  background: "#e8ffe8",
                  padding: "30px",
                  borderRadius: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                  width: "85%",
                  margin: "20px auto",
                }}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ maxWidth: "100%", borderRadius: "8px" }}
                  />
                ) : (
                  <>
                    <p>Upload image of your commodity</p>
                    <span style={{ fontSize: "20px" }}>⬆</span>
                  </>
                )}
              </div>
              <div className="name-phone">
                <div className="name">
                  <label>Your Name</label>
                  <input type="text" placeholder="Enter Your Name" name="sellerName" value={formData.sellerName} onChange={handleChange}/>
                </div>
                <div className="phone">
                  <label>Phone {/*(WhatsApp Number)*/}</label>
                  <input
                    type="phone"
                    placeholder="Enter Your WhatsApp Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-btn">
              <button>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerForm;
