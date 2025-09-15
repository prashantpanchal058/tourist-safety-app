const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ReportSchema = new Schema({
    lan: {
        type: String,
        required: true
    },
    lon: {
        type: String,
        required: true
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

const Report = model("Report", ReportSchema);

module.exports = Report;
