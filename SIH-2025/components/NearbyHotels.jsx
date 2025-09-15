import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdHotel, MdLocationOn, MdStar, MdArrowBack } from "react-icons/md";

const NearbyHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function findHotel() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          try {
            const response = await fetch(
              "http://localhost:8007/loc/nearby-hotels",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ lat, lon }),
              }
            );
            const data = await response.json();
            setHotels(data.hotels || []);
          } catch (err) {
            alert("Failed to fetch Hotels: " + err.message);
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          alert("Error getting location: " + err.message);
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }

  useEffect(() => {
    findHotel();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md p-6 sticky top-0 z-50 flex items-center gap-4">
        {/* Back/Home Icon */}
        <button
          onClick={() => navigate("/dashboard")} // navigate to home page
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <MdArrowBack className="text-2xl text-gray-800" />
        </button>

        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
            <MdHotel className="text-teal-600" /> Nearby Hotels
          </h1>
          <p className="text-gray-600 mt-1">
            Safe & verified hotels near your location
          </p>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-8 flex flex-col space-y-8">
        {/* Info Banner */}
        <div className="rounded-xl bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 text-white p-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Travel Comfort Made Easy 🏨
          </h2>
          <p className="text-white/90 text-lg md:text-xl">
            Find hotels nearby that are safe, verified, and traveler-friendly.
          </p>
        </div>

        {/* Hotels List */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex-1 flex flex-col">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Available Hotels
          </h2>

          {loading ? (
            <p className="text-gray-600 animate-pulse">Fetching nearby hotels...</p>
          ) : hotels.length > 0 ? (
            <ul className="flex-1 overflow-y-auto space-y-6">
              {hotels.map((hotel, idx) => (
                <li
                  key={idx}
                  className="flex flex-col md:flex-row items-start md:items-center gap-4 p-5 border border-gray-200 rounded-xl hover:shadow-xl transition-all duration-300"
                >
                  <MdHotel className="text-4xl text-teal-600 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg md:text-xl text-gray-800">
                      {hotel.name}
                    </h3>
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                      <MdLocationOn className="text-red-500" />{" "}
                      {hotel.address || "Address not available"}
                    </p>
                    <p className="text-gray-600 flex items-center gap-1 mt-1">
                      <MdStar className="text-yellow-500" />{" "}
                      {hotel.rating || "N/A"} ★
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No hotels found near your location.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default NearbyHotels;
