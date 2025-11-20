import React, { useState } from "react";
import axios from "axios";
import "./projectStyles.css";

export default function WeatherView() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    const getWeather = async () => {
        try {
            setError("");
            const apiKey = "8a03c440f1cd7972a742bbfbfe8f39f3";
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );
            setWeather(response.data);
        } catch {
            setError("City not found. Please try again.");
            setWeather(null);
        }
    };

    return (
        <div className="project-container">
            <h2 className="project-title">🌦️ WeatherView</h2>
            <p className="project-subtext">Get live weather updates in any city.</p>

            <div className="weather-box">
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="weather-input"
                />
                <button onClick={getWeather} className="weather-btn">Check</button>

                {error && <p className="error-text">{error}</p>}

                {weather && (
                    <div className="weather-info">
                        <h3>{weather.name}</h3>
                        <p>{Math.round(weather.main.temp)}°C</p>
                        <p>{weather.weather[0].description}</p>
                        <p>💨 {weather.wind.speed} m/s | 💧 {weather.main.humidity}%</p>
                    </div>
                )}
            </div>
        </div>
    );
}
