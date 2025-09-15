import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const PoliceStation = () => {
  const [stations, setStations] = useState([]);
  const navigate = useNavigate();

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }


  // Fetch nearby police stations
  async function fetchPoliceStations() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          try {
            const response = await fetch(
              "http://localhost:8007/loc/nearby-policestation",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ lat, lon }),
              }
            );

            const data = await response.json();

            const elements = Array.isArray(data.policeStations)
              ? data.policeStations
              : [];

            const mappedStations = elements.map((station) => ({
              name: station.name || "Unknown",
              lat: station.location?.lat,
              lon: station.location?.lon,
              distance: getDistanceFromLatLonInKm(lat, lon, station.location?.lat, station.location?.lon).toFixed(2),
              phone: "+91100",
              mapsUrl: `https://www.google.com/maps?q=${station.location?.lat},${station.location?.lon}`,
            }));

            setStations(mappedStations);
          } catch (error) {
            console.error("Error fetching police stations:", error);
          }
        },
        (err) => {
          alert("Error getting location: " + err.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  useEffect(() => {
    fetchPoliceStations();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center">
        <button
          onClick={() => navigate("/dashboard")}
          className="mr-3 text-teal-600 hover:text-teal-700"
        >
          <FaArrowLeft size={20} />
        </button>
        <h1 className="font-bold text-xl text-gray-800">
          Nearby Police Stations
        </h1>
      </header>

      {/* Search & Filter */}
      <div className="p-4 flex gap-2">
        <input
          type="text"
          placeholder="Search location..."
          className="flex-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 shadow">
          Filter
        </button>
      </div>

      {/* Info Banner */}
      <div className="rounded-lg bg-gradient-to-r from-gray-800 via-gray-700 to-teal-600 text-white p-6 shadow-md">
        <h2 className="text-xl font-bold mb-2">Travel Comfort Made Easy 🚔</h2>
        <p className="text-white/90">Search for Nearby Police Stations</p>
      </div>

      {/* Police Stations List */}
      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {stations.length === 0 ? (
          <p className="text-center text-gray-500">Loading stations...</p>
        ) : (
          stations.map((station, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold text-lg text-gray-800">
                  {station.name}
                </h2>
                <p className="text-sm text-gray-600">
                  Lat: {station.lat}, Lon: {station.lon}
                </p>
                <p className="text-xs text-gray-500">{station.distance} km</p>
              </div>
              <div className="flex gap-2">
                <a
                  href={`tel:${station.phone}`}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg flex items-center gap-1"
                >
                  <FaPhoneAlt /> Call
                </a>
                <a
                  href={station.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-1"
                >
                  <FaMapMarkerAlt /> Directions
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Emergency Button */}
      {/* <button className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg">
        🚨
      </button> */}
    </div>
  );
};

export default PoliceStation;
