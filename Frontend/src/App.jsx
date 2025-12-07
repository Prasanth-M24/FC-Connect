import React from "react";
// import "./App.css";
import Navbar from "./components/NavBar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CurrentPrice from "./components/CurrentPrice/CurrentPrice";
import Buyer from "./pages/Buyer";
import Seller from "./pages/Seller";
import WeatherInfo from "./pages/WeatherInfo";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Buyer />} />
            <Route path="/seller" element={<Seller />} />
            <Route path="/currentPrice" element={<CurrentPrice />} />
            <Route path="/weather" element={<WeatherInfo />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
