import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import clear_icon from "./assests/clear.png";
import clear_night_icon from "./assests/clear_night.png";
import cloud_icon from "./assests/cloud.png";
import cloud_night_icon from "./assests/cloud_night.png";
import drizzle_icon from "./assests/drizzle.png";
import rain_icon from "./assests/rain.png";
import snow_icon from "./assests/snow.png";
import humidity_icon from "./assests/humidity.png";
import search_icon from "./assests/search.png";
import wind_icon from "./assests/wind.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_night_icon,
    "02d": cloud_icon,
    "02n": cloud_night_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperatur: Math.round(data.main.temp),
        location: data.name,
        icon: icon,
        weather: data.weather[0].main,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching data", error);
    }
  };

  const searchByCoords = async (lat, lon) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();

      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperatur: Math.round(data.main.temp),
        location: data.name,
        icon: icon,
        weather: data.weather[0].main,
      });
    } catch (error) {
      console.error("Error fetching location weather", error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          searchByCoords(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          search("Delhi"); // fallback city
        }
      );
    } else {
      search("Delhi");
    }
  }, []);

  return (
    <div className="weather-container default">
      <div className="weather-search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          src={search_icon}
          alt="search"
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData && (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
          <p className="weather-detail">{weatherData.weather}</p>
          <p className="temperature">{weatherData.temperatur}℃</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="weather-col">
              <img src={humidity_icon} alt="" />
              <div>
                <span>Humidity</span>
                <p>{weatherData.humidity} %</p>
              </div>
            </div>
            <div className="weather-col">
              <img src={wind_icon} alt="" />
              <div>
                <span>Wind Speed</span>
                <p className="km">{weatherData.windSpeed} Km/h</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
