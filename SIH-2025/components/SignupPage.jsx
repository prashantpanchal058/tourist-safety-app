import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaPassport, FaIdCard } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import IMG1 from "../src/img1.jpg";
import Header from "./Header";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    nationality: "",
    passport: "",
    govId: "",
    emergencyName: "",
    emergencyPhone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }
    const { name, email, phone, address, nationality, emergencyName, emergencyPhone, password } = formData;
    const response = await fetch("http://localhost:8007/auth/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, phone, address, nationality, emergencyName, emergencyPhone, password })
    });
    const json = await response.json()

    if (json.success) {
      //redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/dashboard");// give the path for navigate
      // props.showAlert?.("Acount created successfully.", "success")
    }
    else {
      alert("Invalid creadentioals");
      // props.showAlert?.("Invalid credentials.", "danger")
    }
  }

  // const [alert, setAlert] = useState(null);

  // const showAlert = (message, type) => {
  //   setAlert({
  //     msg: message,
  //     type: type
  //   });
  //   setTimeout(() => {
  //     setAlert(null);
  //   }, 3000);
  // }


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSignup = () => {
  //   if (formData.password !== formData.confirmPassword) {
  //     alert("Passwords do not match ❌");
  //     return;
  //   }

  //   handleSubmit();

  //   // ✅ later connect to backend
  //   // console.log("KYC Signup Data:", formData);
  //   // navigate("/dashboard");
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <Header />
      {/* <div className="w-full max-w-md mx-auto mt-4">
        {alert && <Alert alert={alert} />}
      </div> */}

      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-xl flex w-[1000px] overflow-hidden">
        {/* Left Side - Image */}
        <div className="w-1/2 flex flex-col justify-end text-white p-10" style={{
          backgroundImage: `url(${IMG1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} >
          <h1 className="text-3xl font-bold leading-tight mb-3"> Travel Smart. <br /> Verified for Safety. </h1>
          <p className="text-gray-200 text-sm"> Secure signup with KYC verification ensures your protection. </p>
        </div>

        {/* Right Side - Form */}
        <div className="w-1/2 p-10 overflow-y-auto max-h-[90vh]">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account with KYC Verification !</h2>
          <p className="text-gray-500 mb-5">Fill in your details to get started.</p>

          <div className="space-y-4">
            {/* Full Name */}
            <div className="flex items-center border rounded-md px-3 py-2">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              />
            </div>

            {/* Email */}
            <div className="flex items-center border rounded-md px-3 py-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              />
            </div>

            {/* Phone */}
            <div className="flex items-center border rounded-md px-3 py-2">
              <FaPhone className="text-gray-400 mr-2" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              />
            </div>

            {/* Address */}
            <div className="flex items-center border rounded-md px-3 py-2">
              <MdLocationOn className="text-gray-400 mr-2" />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              />
            </div>

            {/* Nationality */}
            <div className="flex items-center border rounded-md px-3 py-2">
              <FaPassport className="text-gray-400 mr-2" />
              <input
                type="text"
                name="nationality"
                placeholder="Nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              />
            </div>

            {/* Passport Number */}
            <div className="flex items-center border rounded-md px-3 py-2">
              <FaPassport className="text-gray-400 mr-2" />
              <input
                type="text"
                name="passport"
                placeholder="Passport Number"
                value={formData.passport}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              />
            </div>

            {/* Govt ID */}
            <div className="flex items-center border rounded-md px-3 py-2">
              <FaIdCard className="text-gray-400 mr-2" />
              <input
                type="text"
                name="govId"
                placeholder="Government ID (e.g. Aadhaar)"
                value={formData.govId}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              />
            </div>

            {/* Emergency Contact Name */}
            <div className="flex items-center border rounded-md px-3 py-2">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="emergencyName"
                placeholder="Emergency Contact Name"
                value={formData.emergencyName}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              />
            </div>

            {/* Emergency Contact Phone */}
            <div className="flex items-center border rounded-md px-3 py-2">
              <FaPhone className="text-gray-400 mr-2" />
              <input
                type="tel"
                name="emergencyPhone"
                placeholder="Emergency Contact Phone"
                value={formData.emergencyPhone}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              />
            </div>

            {/* Password */}
            <div className="flex items-center border rounded-md px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex items-center border rounded-md px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Signup Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md flex items-center justify-center gap-2 shadow-md mt-6"
          >
            Sign Up
          </button>

          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <a href="/" className="text-green-600 font-medium hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
