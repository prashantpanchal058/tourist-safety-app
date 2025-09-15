import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../src/logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [otherOpen, setOtherOpen] = useState(false);

  return (
    <header className="w-full h-[60px] shadow-md bg-white fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-0">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link to="/dashboard" className="hover:text-teal-600 transition">Home</Link>
          <Link to="#" className="hover:text-teal-600 transition">Contact</Link>
          <Link to="/profile" className="hover:text-teal-600 transition">Profile</Link>

          <div className="relative">
            <button
              onClick={() => setOtherOpen(!otherOpen)}
              className="hover:text-teal-600 focus:outline-none"
              aria-haspopup="true"
              aria-expanded={otherOpen}
            >
              Other
            </button>
            {otherOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md p-2">
                <Link to="/" className="block px-3 py-2 hover:bg-gray-100">Destinations</Link>
                <Link to="/" className="block px-3 py-2 hover:bg-gray-100">Safety</Link>
                <Link to="/authlogin" className="block px-3 py-2 hover:bg-gray-100">Authority</Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-gray-700"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md mt-[60px]">
          <nav className="flex flex-col items-center space-y-4 py-6 text-gray-700 font-medium">
            <Link to="/dashboard" className="hover:text-teal-600 transition">Home</Link>
            <Link to="/profile" className="hover:text-teal-600 transition">Profile</Link>
            <Link to="/safety" className="hover:text-teal-600 transition">Safety</Link>
            <Link to="/guides" className="hover:text-teal-600 transition">Guides</Link>
            <Link to="/contact" className="hover:text-teal-600 transition">Contact</Link>
            <Link to="/authlogin" className="hover:text-teal-600 transition">Authority</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
