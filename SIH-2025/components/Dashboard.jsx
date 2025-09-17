import React, { useState } from "react";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaBars, FaTimes, FaComments, FaEnvelope } from "react-icons/fa";
import { MdLocationOn, MdHotel, MdLocalHospital, MdWarning, MdWbSunny } from "react-icons/md";
import { IoAccessibilitySharp } from "react-icons/io5";
import Header from "./Header";
import Chatbot from "./Chatbot";
// import PoliceStation from "./PoliceStation";
import DashboardWelcome from "./DashboardWelcome";

const Dashboard = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [otherOpen, setOtherOpen] = useState(false);


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* <Header/> */}
      <Header />




      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md mt-16">
          <nav className="flex flex-col items-center space-y-4 py-6 text-gray-700 font-medium">
            <a href="#" className="hover:text-teal-600">Dashboard</a>
            <a href="#" className="hover:text-teal-600">Services</a>
            <a href="#" className="hover:text-teal-600">Booked Plan</a>
            <a href="#" className="hover:text-teal-600">Other</a>
          </nav>
        </div>
      )}


      <main className="flex-1 container mx-auto px-6">

        {/* <div className="flex items-center bg-white shadow-md rounded-lg p-4 mb-6">
          <FaSearch className="text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Search places, services..."
            className="flex-1 outline-none"
          />
          <button className="ml-4 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
            Filter
          </button>
        </div> */}
        <DashboardWelcome />
        {/* Important Aspects */}
        {/* Important Aspects - Top Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg flex items-center space-x-4">
            <MdWarning className="text-3xl text-red-500" />
            <div onClick={() => navigate("/emergency")}>
              <h3 className="font-bold text-lg">Emergency</h3>
              <p className="text-gray-600">File Complain/Instant Help</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg flex items-center space-x-4">
            <IoAccessibilitySharp className="text-3xl text-blue-500" />
            <div onClick={() => navigate("/emergency")}>
              <h3 className="font-bold text-lg">Idle Button</h3>
              <p className="text-gray-600">Play / Pause</p>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <hr className="border-t-2 border-gray-300 my-6" />

        {/* Other Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          
          <div onClick={() => navigate("/Police")} className="bg-white p-6 rounded-xl shadow hover:shadow-lg flex items-center space-x-4">
            <MdLocationOn className="text-3xl text-teal-600" />
            <div>
              <h3 className="font-bold text-lg">Nearby Police</h3>
              <p className="text-gray-600">Check nearest police stations</p>
            </div>
          </div>

          <div onClick={() => navigate("/hotels")} className="bg-white p-6 rounded-xl shadow hover:shadow-lg flex items-center space-x-4">
            <MdHotel className="text-3xl text-teal-600" />
            <div >
              <h3 className="font-bold text-lg">Nearby Hotels</h3>
              <p className="text-gray-600">Safe & verified stays</p>
            </div>
          </div>

          <div onClick={() => navigate("/hospitals")} className="bg-white p-6 rounded-xl shadow hover:shadow-lg flex items-center space-x-4">
            <MdLocalHospital className="text-3xl text-teal-600" />
            <div>
              <h3 className="font-bold text-lg">Hospitals</h3>
              <p className="text-gray-600">Emergency medical support</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg flex items-center space-x-4">
            <MdWarning className="text-3xl text-gray-200" />
            <div>
              <h3 className="font-bold text-lg">Restricted Areas</h3>
              <p className="text-gray-600">Avoid unsafe zones</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg flex items-center space-x-4">
            <MdWbSunny className="text-3xl text-yellow-500" />
            <div onClick={() => navigate("/weather")}>
              <h3 className="font-bold text-lg">Weather</h3>
              <p className="text-gray-600">Current conditions</p>
            </div>
          </div>
        </div>


        {/* Services & Booked Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div onClick={() => navigate("/planlist")} className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
            <h3 className="font-bold text-lg mb-4">Booked Plan</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <p className="text-gray-600">Explore travel & safety services.</p>
          </div>
        </div>
      </main>

      {/* Floating Chatbot Button */}
      {/* <button className="fixed bottom-6 right-6 bg-teal-600 text-black p-4 rounded-full shadow-lg hover:bg-teal-700"> */}

        {/* Floating Chatbot Button */}
        <div className="fixed bottom-6 right-6">
          <Chatbot />
        </div>

      {/* </button> */}


    </div>
  );
};

export default Dashboard;
