// components/AuthorityDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaExclamationTriangle,
  FaFilePdf,
  FaMapMarkerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import AuthWC from "./AuthWC.JSX";
import logo from "../src/logo.png";
import { useNavigate, Link } from "react-router-dom";

const AuthorityDashboard = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({ emergencies: 0, reports: 0 });

  const [livetourist, settourist] = useState([]);
  const [liveto, setlive] = useState({ tourists: 0 });
  
  const [activeIntent, setActiveIntent] = useState("reports"); // reports | emergencies | tourists

  // Fetch reports from backend
  const fetchReports = async () => {
    try {
      const res = await fetch("http://localhost:8007/report/allreports");
      const data = await res.json();
      if (data.success) {
        setReports(data.reports);
        setStats({
          emergencies: data.reports.length,
          reports: data.reports.length,
        });
      }
    } catch (err) {
      console.error("❌ Error fetching reports:", err);
    }
  };

  const fetchTourists = async () => {
    try {
      const res = await fetch("http://localhost:8007/book/bookplan/all");
      const data = await res.json();

      settourist(data.plans)
      console.log(data.plans);

      if (data.success) {
        setlive({
          tourists: data.plans.length,
        });
      }
    } catch (err) {
      console.error("❌ Error fetching tourists:", err);
    }
  };

  // Dummy emergency + tourists detail tables
  const dummyEmergencies = [
    { id: 1, name: "John Doe", type: "Medical", time: "2025-09-15 10:30 AM" },
    { id: 2, name: "Jane Smith", type: "Accident", time: "2025-09-15 11:00 AM" },
  ];

  const dummyTourists = [
    { id: 1, name: "Alex Carter", country: "USA", activeSince: "2025-09-14" },
    { id: 2, name: "Priya Mehta", country: "India", activeSince: "2025-09-13" },
    { id: 3, name: "Liu Wei", country: "China", activeSince: "2025-09-12" },
  ];

  useEffect(() => {
    fetchReports();
    fetchTourists();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <header className="w-full h-[60px] shadow-md bg-white fixed top-0 left-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-6 py-0">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
          </div>
          <nav className="hidden md:flex space-x-8 text-gray-700 font-medium items-center">
            <Link
              to="/"
              className="hover:text-teal-600 transition flex items-center"
            >
              <FaSignOutAlt size={20} />
            </Link>
          </nav>
        </div>
      </header>

      {/* Welcome Banner */}
      <div className="mb-4">
        <AuthWC />
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tourists */}
        <div
          onClick={() => setActiveIntent("tourists")}
          className={`cursor-pointer bg-white rounded-xl shadow p-5 flex items-center gap-4 ${
            activeIntent === "tourists" ? "ring-2 ring-green-500" : ""
          }`}
        >
          <FaUsers className="text-green-500 text-3xl" />
          <div>
            <h3 className="text-xl font-bold">{liveto.tourists}</h3>
            <p className="text-gray-500">Active Tourists</p>
          </div>
        </div>

        {/* Emergencies */}
        <div
          onClick={() => setActiveIntent("emergencies")}
          className={`cursor-pointer bg-white rounded-xl shadow p-5 flex items-center gap-4 ${
            activeIntent === "emergencies" ? "ring-2 ring-red-500" : ""
          }`}
        >
          <FaExclamationTriangle className="text-red-500 text-3xl" />
          <div>
            <h3 className="text-xl font-bold">{stats.emergencies}</h3>
            <p className="text-gray-500">Active Emergencies</p>
          </div>
        </div>

        {/* Reports */}
        <div
          onClick={() => setActiveIntent("reports")}
          className={`cursor-pointer bg-white rounded-xl shadow p-5 flex items-center gap-4 ${
            activeIntent === "reports" ? "ring-2 ring-blue-500" : ""
          }`}
        >
          <FaFilePdf className="text-blue-500 text-3xl" />
          <div>
            <h3 className="text-xl font-bold">{stats.reports}</h3>
            <p className="text-gray-500">Reports Generated</p>
          </div>
        </div>
      </div>

      {/* Conditional Tables */}
      <div className="bg-white rounded-xl shadow p-6">

        {activeIntent === "reports" && (
          <>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaFilePdf className="text-blue-500" /> Reports Table
            </h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="p-3">Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Address</th>
                  <th className="p-3">Emergency Contact</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report._id} className="border-b">
                    <td className="p-3">{report.userId?.name}</td>
                    <td className="p-3">{report.userId?.phone}</td>
                    <td className="p-3">{report.userId?.address}</td>
                    <td className="p-3">
                      {report.userId?.emergencyName} (
                      {report.userId?.emergencyPhone})
                    </td>
                    <td className="p-3">
                      <a
                        href={`https://www.google.com/maps?q=${report.lan},${report.lon}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-green-600 hover:underline"
                      >
                        <FaMapMarkerAlt /> View Map
                      </a>
                    </td>
                    <td className="p-3">
                      {new Date(report.date).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeIntent === "emergencies" && (
          <>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaExclamationTriangle className="text-red-500" /> Emergency Alerts
            </h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="p-3">Name</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {dummyEmergencies.map((em) => (
                  <tr key={em.id} className="border-b">
                    <td className="p-3">{em.name}</td>
                    <td className="p-3">{em.type}</td>
                    <td className="p-3">{em.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeIntent === "tourists" && (
          <>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaUsers className="text-green-500" /> Active Tourists
            </h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="p-3">Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">destination</th>
                  <th className="p-3">destination name</th>
                  <th className="p-3">live</th>
                  <th className="p-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {dummyTourists.map((t) => (
                  <tr key={t.id} className="border-b">
                    <td className="p-3">{t.name}</td>
                    <td className="p-3">{t.country}</td>
                    <td className="p-3">{t.activeSince}</td>
                    <td className="p-3">{t.name}</td>
                    <td className="p-3">{t.country}</td>
                    <td className="p-3">{t.activeSince}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthorityDashboard;
