const express = require('express');
const router = express.Router();
const User = require("../models/User");
const fetchuser = require("../middleware/fetch");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRETE = "prashant";

const { body, validationResult } = require('express-validator');

router.post('/signup', [
    body("name", "Name must be at least 6 characters").isLength({ min: 6 }),
    body("email", "Enter a valid email").isEmail(),
    body("phone", "Enter a valid phone number").isMobilePhone(),
    body("address", "Address is required").notEmpty(),
    body("nationality", "Nationality is required").notEmpty(),
    body("emergencyName", "Emergency contact name is required").notEmpty(),
    body("emergencyPhone", "Enter a valid emergency phone number").isMobilePhone(),
    body("password", "Password must be at least 6 characters").isLength({ min: 6 })
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: " This email is already present." });
        }

        // create hash for password
        const secPass = await bcrypt.hash(req.body.password, 10);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            nationality: req.body.nationality,
            emergencyName: req.body.emergencyName,
            emergencyPhone: req.body.emergencyPhone,
            password: secPass
        });

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRETE, { expiresIn: "7d" });
        success = true;
        res.send({ success, authtoken });

    } catch (err) {
        console.error(err.message);

        res.status(500).send("Internal Server Error");
    }

});

router.post('/login', [
    body('email', 'Enter the valid Email').isEmail(),
    body('password', 'password is required').exists(),
], async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    let user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).json({ success, error: "Email or Password is wrong." });
    }
    const { password } = req.body;
    const passwordCompare = await bcrypt.compare(password, user.password);// (string, hash)
    if (!passwordCompare) {
        return res.status(400).json({ success, error: "Email or Password is wrong." });
    }

    const data = {
        user: {
            id: user.id
        }
    }
    // applying json method
    const authtoken = jwt.sign(data, JWT_SECRETE);
    success = true;
    res.json({ success, authtoken });

});

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        //that means excluding password
        const user = await User.findById(userId).select("-password");
        res.send(user);

    } catch (error) {
        console.error(error.massage);
        res.status(500).send("internal server error.");
    }

})

module.exports = router;