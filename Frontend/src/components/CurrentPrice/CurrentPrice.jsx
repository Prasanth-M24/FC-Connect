import React, { useEffect, useState, useCallback } from "react";
import "./CurrentPrice.css";

const CurrentPrice = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [commodities, setCommodities] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Initial fetch to get unique filters and initial data
  const fetchInitialData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch a larger set initially to extract filter options and show initial data
      // We use our backend proxy here
      const response = await fetch(`http://localhost:5000/api/prices/mandi?limit=500`);
      const data = await response.json();
      
      const records = data.records || [];
      setPrices(records);
      setTotalCount(data.total || 0);
      if (records.length > 0) {
        setLastUpdated(data.updated_date);
      }

      // Extract unique values for filters from this initial set
      setStates([...new Set(records.map((item) => item.state))].sort());
      setCommodities([...new Set(records.map((item) => item.commodity))].sort());
      
      // Districts depend on state, so we'll handle them separately or from the full set
      setDistricts([...new Set(records.map((item) => item.district))].sort());
      
    } catch (error) {
      console.error("Error fetching initial Mandi data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // Fetch filtered data when dropdowns or search changes
  const fetchFilteredData = useCallback(async () => {
    setLoading(true);
    try {
      let url = `http://localhost:5000/api/prices/mandi?limit=100`;
      
      if (selectedState) url += `&state=${selectedState}`;
      if (selectedDistrict) url += `&district=${selectedDistrict}`;
      if (selectedCommodity) url += `&commodity=${selectedCommodity}`;
      
      const response = await fetch(url);
      const data = await response.json();
      setPrices(data.records || []);
      setTotalCount(data.total || 0);
    } catch (error) {
      console.error("Error fetching filtered Mandi data:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedState, selectedDistrict, selectedCommodity]);

  useEffect(() => {
    if (selectedState || selectedDistrict || selectedCommodity) {
      fetchFilteredData();
    }
  }, [selectedState, selectedDistrict, selectedCommodity, fetchFilteredData]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPrices = prices.filter(item => 
    item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.market.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="price-container">
      <header className="price-header">
        <h2>Live Mandi Prices</h2>
        <p>Real-time agricultural commodity prices across India</p>
      </header>

      <div className="filter-section">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search commodity or market..." 
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="filter-dropdowns">
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedDistrict("");
            }}
          >
            <option value="">All States</option>
            {states.map((state, idx) => (
              <option key={idx} value={state}>{state}</option>
            ))}
          </select>

          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            disabled={!selectedState}
          >
            <option value="">All Districts</option>
            {districts
              .filter(d => !selectedState || prices.some(p => p.district === d && p.state === selectedState))
              .map((district, idx) => (
                <option key={idx} value={district}>{district}</option>
              ))}
          </select>

          <select
            value={selectedCommodity}
            onChange={(e) => setSelectedCommodity(e.target.value)}
          >
            <option value="">All Commodities</option>
            {commodities.map((commodity, idx) => (
              <option key={idx} value={commodity}>{commodity}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="info-banner">
        <span>Total Records: {totalCount}</span>
        <span>Last Updated: {lastUpdated ? new Date(lastUpdated).toLocaleString() : 'Loading...'}</span>
      </div>

      {loading && prices.length === 0 ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Fetching latest Mandi prices...</p>
        </div>
      ) : (
        <div className="price-grid">
          {filteredPrices.length > 0 ? (
            filteredPrices.map((item, index) => (
              <div className="price-card" key={index}>
                <div className="card-header">
                  <span className="commodity-badge">{item.commodity}</span>
                  <span className="arrival-date">{item.arrival_date}</span>
                </div>
                
                <div className="market-info">
                  <h4>{item.market}</h4>
                  <div className="location">
                    {item.district}, {item.state}
                  </div>
                </div>

                <div className="price-details">
                  <div className="price-item">
                    <span className="price-label">Min Price</span>
                    <span className="price-value">{formatPrice(item.min_price)}</span>
                  </div>
                  <div className="price-item">
                    <span className="price-label">Max Price</span>
                    <span className="price-value">{formatPrice(item.max_price)}</span>
                  </div>
                  <div className="modal-price">
                    <span className="price-label">Avg Price</span>
                    <span className="price-value">{formatPrice(item.modal_price)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <h3>No prices found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CurrentPrice;

