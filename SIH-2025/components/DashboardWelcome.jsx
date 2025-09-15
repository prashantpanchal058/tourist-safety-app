// components/DashboardWelcome.jsx
import React from "react";
import { FaPlaneDeparture } from "react-icons/fa";
import travelImg from "../src/img1.jpg" // add a travel-themed image in your assets

const DashboardWelcome = () => {
  return (
    <div
      className="relative my-[75px] w-full h-70 rounded-xl overflow-hidden shadow-lg flex items-center justify-between"
      style={{
        backgroundImage: `url(${travelImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0  bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 text-white px-8 py-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FaPlaneDeparture className="text-green-400" />
          Welcome to Smart Travel Safety
        </h2>
        <p className="text-sm text-gray-200 mt-2">
          Discover, travel, and stay safe with our smart monitoring system.
        </p>
        <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow">
          Start Exploring
        </button>
      </div>
    </div>
  );
};

export default DashboardWelcome;
