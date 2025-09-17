import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdHotel, MdArrowBack } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";

const PlanList = () => {
    const [plans, setPlans] = useState([]);
    const navigate = useNavigate();

    // Fetch all booked plans
    const fetchTourists = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:8007/book/bookplan/", {
                method: "GET",
                headers: {
                    "auth-token": token,
                },
            });
            const data = await res.json();
            setPlans(data);
            console.log("✅ Plans:", data);
        } catch (err) {
            console.error("❌ Error fetching tourists:", err);
        }
    };

    // Cancel/Delete a plan
    const cancelPlan = async (planId) => {
        const token = localStorage.getItem("token");
        if (!window.confirm("Are you sure you want to cancel this plan?")) return;

        try {
            const res = await fetch(`http://localhost:8007/book/bookplan/${planId}`, {
                method: "DELETE",
                headers: {
                    "auth-token": token,
                },
            });

            if (res.ok) {
                setPlans(plans.filter((plan) => plan._id !== planId)); // remove from UI
                console.log(`✅ Plan ${planId} deleted`);
            } else {
                const error = await res.json();
                console.error("❌ Error deleting plan:", error);
            }
        } catch (err) {
            console.error("❌ Request failed:", err);
        }
    };

    useEffect(() => {
        fetchTourists();
    }, []);

    return (
        <div>
            {/* Header */}
            <header className="bg-white shadow-md p-6 sticky top-0 z-50 flex items-center gap-4">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                    <MdArrowBack className="text-2xl text-gray-800" />
                </button>
                <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
                    <MdHotel className="text-teal-600" /> Check your plan
                </h1>
            </header>

            {/* Card Section */}
            <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {plans.length > 0 ? (
                    plans.map((plan) => (
                        <div
                            key={plan._id}
                            className="bg-white shadow-md rounded-2xl p-5 border hover:shadow-lg transition"
                        >
                            <h2 className="text-xl font-bold text-gray-800 mb-2">
                                {plan.userId?.name || "Unknown User"}
                            </h2>

                            <p className="text-gray-600">
                                <span className="font-semibold">Destination:</span>{" "}
                                {plan.destName}
                            </p>

                            <p className="text-gray-600">
                                <span className="font-semibold">Address:</span> {plan.address}
                            </p>

                            <p className="text-gray-500 text-sm mt-1">
                                <span className="font-semibold">Time:</span>{" "}
                                {new Date(plan.date).toLocaleString()}
                            </p>

                            {/* Map Button */}
                            <a
                                href={`https://www.google.com/maps/dir/?api=1&origin=${plan.userLoc.lan},${plan.userLoc.lon}&destination=${plan.destination.lan},${plan.destination.lon}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center gap-2 text-green-600 hover:underline"
                            >
                                <FaMapMarkerAlt /> View Map
                            </a>

                            {/* Cancel Button */}
                            <button
                                onClick={() => cancelPlan(plan._id)}
                                className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                                Cancel Plan
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No plans found.</p>
                )}
            </div>
        </div>
    );
};

export default PlanList;
