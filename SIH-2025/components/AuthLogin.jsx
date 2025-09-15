import React, { useState } from "react";
import { FaUser, FaLock, FaSignInAlt,FaSignOutAlt} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import IMG1 from "../src/img2.jpg";
import logo from "../src/logo.png";

const AuthLogin = () => {
    const [credentials, setCredentials] = useState({ userId: "", password: "" });
    const [error, setError] = useState("");
    const [role, setRole] = useState("authority"); // ✅ added
    const navigate = useNavigate(); // ✅ added

    const handleSubmit = (e) => {
        e.preventDefault();

        if (credentials.userId === "admin" && credentials.password === "admin") {
            navigate("/authority");
        } else {
            setError("Invalid credentials.");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
            <header className="w-full h-[60px] shadow-md bg-white fixed top-0 left-0 z-50">
                <div className="container mx-auto flex justify-between items-center px-6 py-0">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-8 text-gray-700 font-medium items-center">
                        <Link to="/" className="hover:text-teal-600 transition flex items-center">
                            <FaSignOutAlt size={20} /> {/* Logout Icon */}
                        </Link>
                    </nav>
                </div>
            </header>

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
                            onClick={() => setRole("authority")}
                            className="flex-1 py-2 rounded-md flex items-center justify-center gap-2 bg-green-500 text-white shadow"
                        >
                            <FaUser /> Authority
                        </button>
                    </div>

                    {/* Input Fields */}
                    <div className="space-y-4">
                        <div className="flex items-center border rounded-md px-3 py-2">
                            <FaUser className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                name="userId"
                                placeholder="User ID"
                                value={credentials.userId}
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
                    {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

                    {/* Login Button */}
                    <div className="space-y-4 py-6">                    <button
                        onClick={handleSubmit}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md flex items-center justify-center gap-2 shadow-md mb-4"
                    >
                        <FaSignInAlt /> DashBoard
                    </button></div>
                </div>
            </div>
        </div>
    );
};

export default AuthLogin;
