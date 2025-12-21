import React, { useEffect, useState, useContext } from "react";
import "./CurrentPrice.css";

import { Link } from "react-router-dom";

const CurrentPrice = () => {
  const [prices, setPrices] = useState([]);
  const [filteredPrices, setFilteredPrices] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [commodities, setCommodities] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [count, setCount] = useState(null);
  const [date, setDate] = useState(null);




  // First fetch to get total count
  useEffect(() => {
    fetch(
      `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd00000179b0e070bcc1458d63d67d7d4a8c4fc3&format=json&limit=1`
    )
      .then((response) => response.json())
      .then((data) => {
        setCount(data.total);
        setDate(data.updated_date);
      })
      .catch((error) => console.error("Error fetching total count:", error));
  }, []);

  // Fetch full data once count is known
  useEffect(() => {
    if (!count) return;

    fetch(
      `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd00000179b0e070bcc1458d63d67d7d4a8c4fc3&format=json&limit=${count}`
    )
      .then((response) => response.json())
      .then((data) => {
        const records = data.records || [];
        setPrices(records);
        setFilteredPrices(records);

        // Extract unique values
        setStates([...new Set(records.map((item) => item.state))]);
        setDistricts([...new Set(records.map((item) => item.district))]);
        setCommodities([
          ...new Set(records.map((item) => item.commodity)),
        ]);
      })
      .catch((error) => console.error("Error fetching full data:", error));
  }, [count]);

  // Filter data when dropdown changes
  useEffect(() => {
    let filtered = prices;

    if (selectedState) {
      filtered = filtered.filter((item) => item.state === selectedState);
    }
    if (selectedDistrict) {
      filtered = filtered.filter((item) => item.district === selectedDistrict);
    }
    if (selectedCommodity) {
      filtered = filtered.filter(
        (item) => item.commodity === selectedCommodity
      );
    }

    setFilteredPrices(filtered);
  }, [selectedState, selectedDistrict, selectedCommodity, prices]);

  const Formated = new Date(date);
  return (
    <div className="price-container">
      <h2>Mandi Prices</h2>

      {/* Filter Section */}
      <div className="filter-container">
        <select
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedDistrict(""); // reset district when state changes
          }}
        >
          <option value="">Select State</option>
          {states.map((state, idx) => (
            <option key={idx} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          <option value="">Select District</option>
          {districts
            .filter(
              (district) =>
                !selectedState ||
                prices.find(
                  (item) =>
                    item.district === district && item.state === selectedState
                )
            )
            .map((district, idx) => (
              <option key={idx} value={district}>
                {district}
              </option>
            ))}
        </select>

        <select
          value={selectedCommodity}
          onChange={(e) => setSelectedCommodity(e.target.value)}
        >
          <option value="">Select Commodity</option>
          {commodities.map((commodity, idx) => (
            <option key={idx} value={commodity}>
              {commodity}
            </option>
          ))}
        </select>
        <div className="prices-info">
          {/* <p className="info-about-pricing">For Better Information Come at Evening Time</p> */}
          <p className="total-product">Total no. of Product: {count}</p>
          <p className="updated-date-info">
            Price updated :
            {date && !isNaN(Formated.getTime()) ? " " +
              Formated.toLocaleString("en-IN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              }) : " Loading..."}
          </p>
        </div>
      </div>

      <table className="price-table">
        <thead>
          <tr>
            <th>Commodity</th>
            <th>Arrival Date</th>
            <th>State</th>
            <th>District</th>
            <th>Market</th>
            <th>Min Price</th>
            <th>Max Price</th>
            <th>Avg Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredPrices.length > 0 ? (
            filteredPrices.map((item, index) => (
              <tr key={index}>
                <td className="commodity">{item.commodity}</td>
                <td>{item.arrival_date}</td>
                <td>{item.state}</td>
                <td>{item.district}</td>
                <td>{item.market}</td>
                <td>Rs {item.min_price} / Quintal</td>
                <td>Rs {item.max_price} / Quintal</td>
                <td>Rs {item.modal_price} / Quintal</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                {count ? "Loading data..." : "Fetching count..."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CurrentPrice;
