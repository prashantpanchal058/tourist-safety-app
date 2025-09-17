import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import LoginPage from "../components/LoginPage";
import UserProfile from "../components/UserProfile";
import WeatherPage from "../components/WeatherPage";
import SignupPage from "../components/SignupPage.jsx";
import EmergencyButton from "../components/EmergencyButton.jsx";
import PoliceStation from "../components/PoliceStation.jsx";
import AuthorityDashboard from "../components/AuthorityDashboard.jsx";
import NearbyHotels from "../components/NearbyHotels.jsx";
import NearbyHospitals from "../components/NearbyHospitals.jsx"
import AuthLogin from "../components/AuthLogin.jsx";
import HospitalMap from "../components/HospitalMap.jsx";
import PlanList from "../components/PlanList.jsx";
// import Alert from '../components/Alert.jsx';

const App = () => {

  const token = localStorage.getItem("token");

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

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/emergency" element={<EmergencyButton />} />
        <Route path="/authority" element={<AuthorityDashboard />} />
        <Route path="/police" element={<PoliceStation />} />
        <Route path="/hotels" element={<NearbyHotels />} />
        <Route path="/hospitals" element={<NearbyHospitals />} />
        <Route path="/authlogin" element={<AuthLogin />} />
        <Route path="/hospital-map" element={<HospitalMap />} />
        <Route path="/planlist" element={<PlanList />} />
      </Routes>

    </>
  );
};

export default App;   // ✅ this must export App
