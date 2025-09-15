// pages/WeatherPage.jsx
import React, { useEffect, useState } from "react";

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);


  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  // apiKey = VITE_GEMINI_API_KEY="AIzaSyCRftMi1ZLbDEupkTGY8IFsYl80Nh675sc"

  // ✅ Fetch weather by coordinates (for current location)
  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      console.log("Weather API response:", data); // 🔍 Debug
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setLoading(false);
    }
  };


  // ✅ Fetch weather by city name (for search)
  const fetchWeatherByCity = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setLoading(false);
    }
  };

  // ✅ Get user’s location on first load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
          console.warn("Geolocation denied, defaulting to Delhi");
          fetchWeatherByCity("Solapur"); // fallback city
        }
      );
    } else {
      fetchWeatherByCity("Pune"); // fallback if geolocation not supported
    }
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <h1 className="text-2xl font-bold mb-4">🌤 Weather</h1>

      {/* Search Bar */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          className="flex-1 border px-3 py-2 rounded-lg"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeatherByCity(city)}
        />
        <button
          onClick={() => fetchWeatherByCity(city)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </div>

      {/* Weather Info */}
      {loading ? (
        <p>Loading weather...</p>
      ) : weather && weather.main ? (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-xl font-semibold">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="text-4xl font-bold my-2">{Math.round(weather.main.temp)}°C</p>
          <p className="capitalize text-gray-600">{weather.weather[0].description}</p>
          <div className="mt-4 flex justify-between text-sm text-gray-700">
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>🌬 Wind: {weather.wind.speed} m/s</p>
          </div>
        </div>
      ) : (
        <p>⚠️ Couldn’t fetch weather. Try searching a city.</p>
      )}
    </div>
  );
};

export default WeatherPage;
