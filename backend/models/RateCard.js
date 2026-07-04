const mongoose = require("mongoose");

const rateCardSchema = new mongoose.Schema({

    shipmentType: {
        type: String,
        enum: ["B2B", "B2C"],
        required: true
    },

    baseRate: {
        type: Number,
        required: true
    },

    ratePerKg: {
        type: Number,
        required: true
    },

    codCharge: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

module.exports = mongoose.model("RateCard", rateCardSchema);