import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./CommodityListings.css";

const CommodityListings = () => {
  const [sellerPrices, setSellerPrices] = useState([]);
  const { user } = useContext(AuthContext);
  
  // Edit State
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    commodity: "",
    quantity: "",
    price: "",
    unit: "",
    description: ""
  });

  // Fetch Seller Prices
  const fetchSellerPrices = () => {
    let url = 'http://localhost:5000/api/prices';
    if (user) {
        url += `?user=${user._id || user.id}`;
    }
    
    fetch(url)
      .then(res => res.json())
      .then(data => setSellerPrices(data))
      .catch(err => console.error("Error fetching seller prices:", err));
  };

  useEffect(() => {
    fetchSellerPrices();
  }, [user]); // Re-fetch when user changes

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/prices/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSellerPrices(sellerPrices.filter(item => item._id !== id));
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const handleEditClick = (item) => {
    setEditingId(item._id);
    setEditFormData({
      commodity: item.commodity,
      quantity: item.quantity,
      price: item.price,
      unit: item.unit,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/prices/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editFormData)
      });

      if (response.ok) {
        const updatedItem = await response.json();
        setSellerPrices(sellerPrices.map(item => item._id === id ? updatedItem : item));
        setEditingId(null);
      } else {
        const data = await response.json();
        alert(data.message || "Failed to update");
      }
    } catch (error) {
      console.error("Error updating listing:", error);
    }
  };

  return (

    <div className="commodity-listings-container">
      <h2>My Products Listing</h2>
      <p>Manage your product listings here. You can edit or delete your posts after selling.</p>
      
      <div className="listings-grid">
        {user ? (
           sellerPrices.length > 0 ? (
             sellerPrices.map((item) => (
            <div className="listing-card" key={item._id}>
              {editingId === item._id ? (
                // Edit Mode Card
                 <div className="card-content">
                    <div className="edit-form">
                        <input 
                            type="text" 
                            name="commodity" 
                            placeholder="Commodity"
                            value={editFormData.commodity} 
                            onChange={handleEditChange} 
                        />
                        <input 
                            type="number" 
                            name="quantity" 
                            placeholder="Quantity"
                            value={editFormData.quantity} 
                            onChange={handleEditChange} 
                        />
                        <input 
                            type="text" 
                            name="unit" 
                            placeholder="Unit (e.g., kg, quintal)"
                            value={editFormData.unit} 
                            onChange={handleEditChange} 
                        />
                         <input 
                            type="number" 
                            name="price" 
                            placeholder="Price"
                            value={editFormData.price} 
                            onChange={handleEditChange} 
                        />
                        <div className="edit-actions">
                            <button className="save-btn" onClick={() => handleSaveEdit(item._id)}>Save</button>
                            <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
                        </div>
                    </div>
                 </div>
              ) : (
                // View Mode Card
                <>
                  <div className="card-header">
                    <span className="seller-name">{item.sellerName || 'Farmer'}</span>
                    <span className="listing-date">{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="card-image">
                    {item.image ? (
                        <img src={item.image} alt={item.commodity} />
                    ) : (
                        <div className="placeholder-image">
                            {item.commodity.charAt(0).toUpperCase()}
                        </div>
                    )}
                  </div>

                  <div className="card-content">
                    <h3 className="commodity-title">{item.commodity}</h3>
                    <span className="location-tag">📍 {item.district}, {item.state}</span>
                    
                    <div className="detail-row">
                        <span className="detail-label">Price:</span>
                        <span>Rs {item.price} / {item.unit || 'Unit'}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Quantity:</span>
                        <span>{item.quantity} {item.unit}</span>
                    </div>
                     <div className="detail-row">
                        <span className="detail-label">Contact:</span>
                        <span>{item.phone}</span>
                    </div>
                  </div>

                  <div className="card-actions">
                    <button className="edit-btn" onClick={() => handleEditClick(item)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", gridColumn: "1 / -1", padding: "40px" }}>
            <h3>No active listings found.</h3>
          </div>
        )
      ) : (
        <div style={{ textAlign: "center", gridColumn: "1 / -1", padding: "40px" }}>
             <h3>Please Login to view your listings.</h3>
        </div>
      )}
      </div>
    </div>
  );

};

export default CommodityListings;
