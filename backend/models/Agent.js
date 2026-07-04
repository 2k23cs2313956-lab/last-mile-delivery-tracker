const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    zone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Available", "Busy"],
        default: "Available"
    }
}, { timestamps: true });

module.exports = mongoose.model("Agent", agentSchema);