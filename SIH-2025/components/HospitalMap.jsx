import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MdArrowBack, MdLocalHospital } from "react-icons/md";

const HospitalMap = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const hospital = location.state?.hospital;

    const mapRef = useRef(null);
    const userMarkerRef = useRef(null);
    const hospitalMarkerRef = useRef(null);
    const routeLineRef = useRef(null);

    const [userLocation, setUserLocation] = useState(
        location.state?.userLocation || null
    );
    const [distanceKm, setDistanceKm] = useState(null);

    // Utility: calculate distance using Haversine formula
    const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of Earth in km
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return (R * c).toFixed(2); // km
    };

    // Draw straight line
    const fetchRoute = (start, end, map) => {
        if (routeLineRef.current && map.hasLayer(routeLineRef.current)) {
            map.removeLayer(routeLineRef.current);
        }

        routeLineRef.current = L.polyline(
            [
                [start.lat, start.lon],
                [end.lat, end.lon],
            ],
            { color: "blue", weight: 5, opacity: 0.7 }
        ).addTo(map);

        map.fitBounds(routeLineRef.current.getBounds());

        // Calculate distance + time (assume avg 40 km/h driving)
        const dist = getDistanceFromLatLonInKm(start.lat, start.lon, end.lat, end.lon);
        setDistanceKm(dist);

    };

    useEffect(() => {
        if (!hospital) return;

        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }

        mapRef.current = L.map("map").setView(
            [hospital.location.lat, hospital.location.lon],
            15
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
        }).addTo(mapRef.current);

        // Add hospital marker
        hospitalMarkerRef.current = L.marker([
            hospital.location.lat,
            hospital.location.lon,
        ])
            .addTo(mapRef.current)
            .bindPopup(`<b>${hospital.name}</b><br/>${hospital.address || ""}`)
            .openPopup();

        const map = mapRef.current;

        const updateUserLocation = (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            const newLocation = { lat, lon };
            setUserLocation(newLocation);

            if (userMarkerRef.current && map.hasLayer(userMarkerRef.current)) {
                userMarkerRef.current.setLatLng([lat, lon]);
            } else {
                userMarkerRef.current = L.marker([lat, lon], {
                    icon: L.icon({
                        iconUrl: "/user-marker.png",
                        iconSize: [30, 30],
                    }),
                })
                    .addTo(map)
                    .bindPopup("📍 You are here");
            }

            if (hospital.location) {
                fetchRoute(newLocation, hospital.location, map);
            }
        };

        if (navigator.geolocation) {
            const watcher = navigator.geolocation.watchPosition(
                updateUserLocation,
                (err) => alert("Error: " + err.message),
                { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
            );

            return () => {
                navigator.geolocation.clearWatch(watcher);
                if (mapRef.current) {
                    mapRef.current.remove();
                    mapRef.current = null;
                }
                userMarkerRef.current = null;
                hospitalMarkerRef.current = null;
                routeLineRef.current = null;
            };
        } else {
            alert("Geolocation not supported");
        }
    }, [hospital]);

    const booked = async () => {
        if (!userLocation) {
            alert("User location not available");
            return;
        }

        const token = localStorage.getItem("token");

        const payload = {
            destName: hospital.name,
            address: hospital.address || "",
            userLoc: {
                lan: String(userLocation.lat),
                lon: String(userLocation.lon),
            },
            destination: {
                lan: String(hospital.location.lat),
                lon: String(hospital.location.lon),
            },
        };

        try {
            const res = await fetch("http://localhost:8007/book/bookplan/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!data.success) {
                alert(data.message || "You already booked a plan.");
            } else {
                alert("Plan booked successfully!");
            }
        } catch (err) {
            alert("Error booking plan.");
        }
    };


    const bookplans = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to book a plan.");
            navigate("/")
            return;
        }

        if (!window.confirm("You want to book the plan ?")) return;

        await booked();
        navigate("/dashboard");

        if (
            hospital.location.lat &&
            hospital.location.lon &&
            userLocation?.lat &&
            userLocation?.lon
        ) {
            const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lon}&destination=${hospital.location.lat},${hospital.location.lon}`;
            window.open(url, "_blank"); // opens Google Maps
        } else {
            alert("Location not available for directions");
        }
    };



    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="bg-white shadow-md p-4 flex items-center gap-4">
                <button
                    onClick={() => navigate("/hospitals")}
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                    <MdArrowBack className="text-2xl text-gray-800" />
                </button>
                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-800 flex items-center gap-2">
                    <MdLocalHospital className="text-red-600" /> {hospital?.name}
                </h1>
            </header>

            <div className="flex flex-col sm:flex-row flex-1">
                {/* Side panel */}
                <div className="w-full sm:w-80 bg-white shadow p-4 flex flex-col gap-4">
                    <h2 className="font-bold text-lg sm:text-xl">Route Info</h2>
                    {userLocation ? (
                        <>
                            <p><strong>Hospital:</strong> {hospital.name}</p>
                            <p><strong>Address:</strong> {hospital.address || "N/A"}</p>
                            <p><strong>From:</strong> Your Location</p>
                            <p><strong>To:</strong> {hospital.name}</p>
                            <p><strong>Distance:</strong> {distanceKm} km</p>

                            <div className="flex flex-col sm:flex-row gap-2 mt-2">
                                <button
                                    className="w-full sm:w-auto bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700"
                                    onClick={bookplans}
                                >
                                    Book plan
                                </button>
                                <button
                                    className="w-full sm:w-auto bg-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300"
                                    onClick={() => navigate("/hospitals")}
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <p>Fetching location...</p>
                    )}
                </div>

                {/* Map */}
                {/* Map */}
                <div
                    id="map"
                    className="flex-1 h-[50vh] sm:h-screen"
                ></div>

            </div>
        </div>
    );

};

export default HospitalMap;
