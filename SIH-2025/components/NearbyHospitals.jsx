import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarkerAlt } from "react-icons/fa";

const NearbyHospitals = () => {
    const [hospitals, setHospitals] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const navigate = useNavigate();

    // Calculate distance between two coordinates
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

    // Fetch nearby hospitals
    async function findHospitals() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const lat = pos.coords.latitude;
                    const lon = pos.coords.longitude;
                    setUserLocation({ lat, lon });

                    try {
                        const response = await fetch(
                            "http://localhost:8007/loc/nearby-hospitals",
                            {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ lat, lon }),
                            }
                        );

                        const data = await response.json();

                        if (data.hospitals) {
                            const mappedHospitals = data.hospitals.map((hospital) => {
                                const distance =
                                    hospital.location.lat && hospital.location.lon
                                        ? getDistanceFromLatLonInKm(
                                            lat,
                                            lon,
                                            hospital.location.lat,
                                            hospital.location.lon
                                        ).toFixed(2)
                                        : null;

                                return {
                                    ...hospital,
                                    distance: distance ? parseFloat(distance) : null,
                                };
                            });

                            // Sort by nearest
                            mappedHospitals.sort(
                                (a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity)
                            );

                            setHospitals(mappedHospitals);
                        }
                    } catch (err) {
                        alert("Failed to fetch hospitals: " + err.message);
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

    React.useEffect(() => {
        findHospitals();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow p-4 flex items-center sticky top-0 z-50">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="mr-3 text-teal-600 hover:text-teal-700"
                >
                    <FaArrowLeft size={20} />
                </button>
                <h1 className="font-bold text-xl text-gray-800">Nearby Hospitals</h1>
            </header>

            {/* Hospitals List */}
            <div className="px-4 flex flex-col gap-4 mb-6 mt-4">
                {hospitals.length === 0 ? (
                    <p className="text-gray-600">Fetching nearby hospitals...</p>
                ) : (
                    hospitals.map((hospital, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2 border hover:shadow-lg transition"
                        >
                            <h3 className="text-lg font-bold text-gray-800">
                                {hospital.name}
                            </h3>
                            <p className="flex items-center text-gray-600 text-sm">
                                <FaMapMarkerAlt className="mr-2 text-teal-600" />
                                {hospital.address || "No address available"}
                            </p>
                            {hospital.distance !== null && (
                                <p className="text-sm text-gray-700 font-medium">
                                    📍 {hospital.distance} km away
                                </p>
                            )}
                            {/* View on Map */}
                            <button
                                className="mt-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 shadow"
                                onClick={() =>
                                    navigate("/hospital-map", {
                                        state: { hospital, userLocation },
                                    })
                                }
                            >
                                View on Map
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NearbyHospitals;
