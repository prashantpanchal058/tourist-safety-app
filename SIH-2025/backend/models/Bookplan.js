const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const BookPlanSchema = new Schema({
    destName: {
        type: String,
        required: true,
        default: ""
    },
    address: {
        type: String,
        required: true,
        default: ""
    },
    userLoc: {
        lan: {
            type: String,
            required: true
        },
        lon: {
            type: String,
            required: true
        }
    },
    destination: {
        lan: {
            type: String,
            required: true
        },
        lon: {
            type: String,
            required: true
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    }
}, { timestamps: true });

const BookPlan = model("bookplan", BookPlanSchema);

module.exports = BookPlan;
