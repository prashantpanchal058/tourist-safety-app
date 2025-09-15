const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const fetchuser = require("../middleware/fetch");

router.post("/reportsend", fetchuser, async (req, res) => {
    try {
        const { lan, lon } = req.body;   // consider renaming to lat/lon
        const userId = req.user.id;

        // Check if a report exists in the last 5 minutes
        const recentReport = await Report.findOne({
            userId
        });

        if (recentReport) {
            return res.json({
                status: 400,
                success: false,
                message: "⚠️ Your report has already been submitted.",
            });
        }

        const report = await Report.create({ lan, lon, userId });
        res.json({ success: true, message: "🚨 Report submitted successfully", report });

    } catch (err) {
        console.error("❌ Error in /reportsend:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

router.get("/allreports", async (req, res) => {
    try {
        const reports = await Report.find()
            .populate("userId")
            .sort({ createdAt: -1 });

        res.json({ success: true, reports });
    } catch (err) {
        console.error("❌ Error fetching reports:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;
