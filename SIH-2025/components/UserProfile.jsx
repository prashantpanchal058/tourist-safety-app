import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaSignOutAlt,
} from "react-icons/fa";
import Header from "../components/Header";

const ProfilePage = () => {
  const [user, setUser] = useState(null); // initially null
  const navigate = useNavigate();

  // ✅ Fetch user from backend on component load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // stored after login
        if (!token) {
          navigate("/"); // if no token, redirect to login
          return;
        }

        const response = await fetch("http://localhost:8007/auth/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });

        const data = await response.json();
        setUser(data); // save user in state
      } catch (err) {
        console.error("Error fetching user:", err);
        navigate("/"); // redirect if error (like invalid token)
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) {
    return <div className="text-center mt-20">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-green-100 via-white to-blue-100">
      <Header />

      {/* Profile Card */}
      <div className="w-[480px] bg-white shadow-2xl rounded-2xl mt-20 p-8 relative">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-green-200 flex items-center justify-center text-4xl font-bold text-green-700 shadow-md">
            {user.name.charAt(0)}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-3">{user.name}</h2>
          <p className="text-gray-500">{user.nationality}</p>
        </div>

        {/* Info Section */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3 text-gray-700">
            <FaEnvelope className="text-green-500" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FaPhone className="text-green-500" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FaMapMarkerAlt className="text-green-500" />
            <span>{user.address}</span>
          </div>
        </div>

        {/* Emergency Contact */}
        {user.emergencyName && (
          <div className="mt-6 bg-blue-50 p-4 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Emergency Contact
            </h3>
            <div className="flex items-center gap-3 text-gray-700">
              <FaUser className="text-blue-500" />
              <span>
                {user.emergencyName} - {user.emergencyPhone}
              </span>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 shadow-md">
            <FaEdit /> Edit Profile
          </button>
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 shadow-md"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
