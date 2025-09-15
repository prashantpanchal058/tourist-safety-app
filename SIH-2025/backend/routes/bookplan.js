const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetch");
const BookPlan = require("../models/Bookplan");

// Create a new BookPlan (only one per user)
router.post("/bookplan", fetchuser, async (req, res) => {
    try {
        const { destName, address, userLoc, destination } = req.body;

        const existingPlan = await BookPlan.findOne({ userId: req.user.id });
        if (existingPlan) {
            return res.status(400).json({
                success: false,
                message: "You already booked another tour."
            });
        }

        const newPlan = new BookPlan({
            destName,
            address,
            userLoc,
            destination,
            userId: req.user.id
        });

        const savedPlan = await newPlan.save();
        res.json({ success: true, plan: savedPlan });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});

// Get all BookPlans for logged-in user
router.get("/bookplan", fetchuser, async (req, res) => {
    try {
        const plans = await BookPlan.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(plans);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});

// Authority: Get all BookPlans
router.get("/bookplan/all", async (req, res) => {
    try {
        const allPlans = await BookPlan.find()
            .populate("userId")
            .sort({ createdAt: -1 });

        res.json({ success: true, plans: allPlans });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});

// Delete a BookPlan
router.delete("/bookplan/:id", fetchuser, async (req, res) => {
    try {
        const plan = await BookPlan.findById(req.params.id);

        if (!plan) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        // Only owner or authority can delete
        if (plan.userId.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Not allowed to delete this booking" });
        }

        await plan.deleteOne();
        res.json({ success: true, message: "Booking deleted successfully" });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
