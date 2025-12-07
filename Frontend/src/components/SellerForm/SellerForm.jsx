import React, { useState } from "react";
import "./SellerForm.css";
import seller_left_image from "../assets/seller_left_image.jpeg";

const SellerForm = () => {
  const [preview, setPreview] = useState(null);
  const handleInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      console.log(URL.createObjectURL(file));
    }
  };
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
          <form action="">
            <h1>Required Information</h1>
            <div className="comodityName">
              <label>Comodity Name</label>
              <input type="text" id="comodityName" placeholder="eg. Tomato" name="comodityName"/>
            </div>
            <div className="quantity-unit">
              <div className="quantity">
                <label>Quantity</label>
                <input type="number" placeholder="eg. 100" name="quantity"/>
              </div>
              <div className="unit">
                <label>Unit</label>
                <select name="unit" id="">
                  <option value="">Select one</option>
                  <option value="">Kg</option>
                  <option value="">MT</option>
                  <option value="">Quintal</option>
                  <option value="">Ton</option>
                </select>
              </div>
            </div>
            <div className="location-detail">
              <div className="state">
                <label>State</label>
                <input type="text" placeholder="eg. Tamil Nadu" name="State" />
              </div>
              <div className="district">
                <label>District</label>
                <input type="text" placeholder="eg. Salem" name="District" />
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
                  <input type="text" placeholder="Enter Your Name" name="Farmer Name"/>
                </div>
                <div className="phone">
                  <label>Phone {/*(WhatsApp Number)*/}</label>
                  <input
                    type="phone"
                    placeholder="Enter Your WhatsApp Number"
                    name="whatsapp number"
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
