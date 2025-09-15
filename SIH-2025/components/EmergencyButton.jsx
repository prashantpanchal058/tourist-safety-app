import React, { useState, useEffect } from "react";
import { FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EmergencyButton = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // ✅ Fetch user info once
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return alert("⚠️ Please log in again.");

      try {
        const res = await fetch("http://localhost:8007/auth/getuser", {
          method: "POST",
          headers: { "Content-Type": "application/json", "auth-token": token },
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("❌ Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  // ✅ Send report to backend
  const sendReport = async (lan, lon) => {
    const token = localStorage.getItem("token");
          console.log("hii")

    try {
      const res = await fetch("http://localhost:8007/report/reportsend", {
        method: "POST",
        headers: { "Content-Type": "application/json", "auth-token": token },
        body: JSON.stringify({ lan, lon }),
      });
      const data = await res.json();

      if(data.success)
      alert("🚨 Emergency report sent!");

      if(data.status == 400){
        alert("Your report already submitted.")
      }
    } catch (err) {
      console.error("❌ Error sending report:", err);
    }
  };

  const handleEmergency = () => {
    if (!window.confirm("⚠️ Send emergency details to authorities?")) return;

    if (!navigator.geolocation) {
      sendReport("N/A", "N/A");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => sendReport(coords.latitude, coords.longitude),
      () => sendReport("N/A", "N/A"),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button onClick={() => navigate("/dashboard")} className="mr-3 text-teal-600">
        <FaArrowLeft size={20} />
      </button>
      <button
        onClick={handleEmergency}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg text-lg font-semibold"
      >
        <FaExclamationTriangle /> Emergency
      </button>
    </div>
  );
};

export default EmergencyButton;
