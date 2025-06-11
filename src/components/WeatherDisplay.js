// src/components/WeatherDisplay.js
import React, { useState, useEffect } from "react";

const WeatherCard = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherApiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

        const apiRes = await fetch(weatherUrl);
        if (!apiRes.ok)
          throw new Error(`OpenWeather Error: ${await apiRes.text()}`);
        const data = await apiRes.json();
        console.log("Weather data received for", city, ":", data);
        if (data && data.main && data.weather) {
          setWeather(data);
        } else {
          console.error("Invalid weather data structure for", city, ":", data);
          setWeather(null); // Reset if data is invalid
        }
        // setWeather(data);
      } catch (error) {
        console.error("Failed to fetch weather for", city);
      }
    };
    fetchWeather();
  }, [city]);

  if (!weather) return <div className="p-2">Loading weather...</div>;

  const time = new Date().toLocaleTimeString("en-US", {
    timeZone: weather.timezone > 0 ? "Etc/GMT-1" : "Etc/GMT+5",
    hour: "2-digit",
    minute: "2-digit",
  }); // Simplified timezone logic

  // time for lome timezone in fr
  const lomeTime = new Date().toLocaleTimeString("fr-FR", {
    timeZone: "Africa/Lome",
    hour: "2-digit",
    minute: "2-digit",
  });
  

  return (
    <div className="p-2 text-center">
      <p className="font-bold">{weather.name}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        alt={weather.weather[0].description}
        className="mx-auto"
      />
      <p>{Math.round(weather.main.temp)}°C</p>
      <p className="text-sm text-slate-400">{city==="Lome" ? lomeTime : time }</p>
    </div>
  );
};

const WeatherDisplay = () => (
  <div className="mt-6 grid grid-cols-2 divide-x divide-slate-700 bg-slate-800/50 rounded-lg">
    <WeatherCard city="Allentown" />
    <WeatherCard city="Lome" />
  </div>
);

export default WeatherDisplay;
