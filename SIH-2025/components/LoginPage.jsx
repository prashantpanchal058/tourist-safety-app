import React, { useState, useEffect } from "react";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import IMG1 from "../src/img2.jpg";
import Header from "../components/Header";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [role, setRole] = useState("tourist");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8007/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("token", json.authtoken); // save token
        navigate("/dashboard");
      } else {
        setError("Invalid credentials ❌");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <Header />

      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-xl flex w-[900px] overflow-hidden">
        {/* Left Side */}
        <div
          className="w-1/2 flex flex-col justify-end text-white p-10"
          style={{
            backgroundImage: `url(${IMG1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-3xl font-bold leading-tight mb-3">
            Discover the Unseen. <br /> Travel with Confidence.
          </h1>
          <p className="text-gray-200 text-sm">
            Your safety, powered by smart technology.
          </p>
        </div>

        {/* Right Side (Form) */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-500 mb-5">Sign in to travel safely.</p>

          {/* Role Tabs */}
          <div className="flex bg-green-50 rounded-md p-1 mb-6">
            <button
              onClick={() => setRole("tourist")}
              className="flex-1 py-2 rounded-md flex items-center justify-center gap-2 bg-green-500 text-white shadow"
            >
              <FaUser /> Tourist
            </button>
            {/* Uncomment if authority login is enabled */}
            {/* <button
              onClick={() => setRole("authority")}
              className={`flex-1 py-2 rounded-md flex items-center justify-center gap-2 ${
                role === "authority"
                  ? "bg-green-500 text-white shadow"
                  : "text-gray-600"
              }`}
            >
              <MdSecurity /> Authority
            </button> */}
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            <div className="flex items-center border rounded-md px-3 py-2">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="email"
                placeholder="E-mail"
                value={credentials.email}
                onChange={onChange}
                className="w-full outline-none bg-transparent"
              />
            </div>
            <div className="flex items-center border rounded-md px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={onChange}
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}

          {/* Remember Me + Forgot */}
          <div className="flex justify-between items-center text-sm mt-3 mb-5">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="text-green-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md flex items-center justify-center gap-2 shadow-md mb-4"
          >
            <FaSignInAlt /> Log In
          </button>

          {/* Sign Up */}
          <p className="text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-green-600 font-medium hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
